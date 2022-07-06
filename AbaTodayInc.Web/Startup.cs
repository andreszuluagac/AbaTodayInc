using System.IO;
using System.Linq;
using System.Text;
using AbaToday.DataAccess;
using AbaToday.DataAccess.Seeders;
using AbaToday.Domain.Data;
using AbaToday.Helpers;
using AbaToday.Repos.Domain;
using AbaToday.Repos.Domain;
using AbaToday.Repos.HttpServices;
using AbaToday.Web.ClientHelpers;
using AbaToday.Web.ScheduledTasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using AbaToday.Repos.Domain.Interfaces;
using AbaToday.Repos.Domain.Implementations;
using AbaTodayInc.Repos.Domain.Interfaces;
using AbaTodayInc.Repos.Domain.Implementations;

namespace AbaToday.Web
{
    public class UrlHelper
    {
        public string BaseUrl { get; set; }
    }

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region Framework Services

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AbaToday", Version = "v1" });
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddIdentity<ApplicationUser, ApplicationRole>(config =>
                {
                    config.User.RequireUniqueEmail = true;
                    config.Password.RequireDigit = true;
                    config.Password.RequiredLength = 6;
                    config.Password.RequireNonAlphanumeric = true;
                    config.Password.RequireUppercase = false;
                    config.Password.RequireLowercase = false;
                }).AddRoles<ApplicationRole>()
                //.AddDefaultUI()
                .AddDefaultTokenProviders().AddEntityFrameworkStores<ApplicationDbContext>();

            services
                .AddAuthentication(sharedOptions =>
                {
                    sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(
                    config =>
                    {
                        config.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidIssuer = Configuration["Tokens:Issuer"],
                            ValidAudience = Configuration["Tokens:Audience"],
                            IssuerSigningKey =
                                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
                        };
                    });

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "wwwroot/dist"; });

            services.AddApplicationInsightsTelemetry();

            #endregion

            #region Application Services

            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddSingleton<ISmsSender, SmsSender>();
            services.AddTransient<InitialDataSeeder>();
            services.AddTransient<ApplicationUserSeeder>();
            services.AddTransient<ApplicationActionsSeeder>();
            services.AddTransient<IAbaTodayIncClientHelpers, AbaTodayIncClientHelpers>();
            services.AddTransient<ISecurityRepo, SecurityRepo>();
            services.AddTransient<IMasterEntityRepo, MasterEntityRepo>();
            services.AddTransient<INotificationsRepo, NotificationsRepo>();
            services.AddTransient<IEnviaHttpService, EnviaHttpService>();
            services.AddTransient<ICustomerRepo, CustomerRepo>();

            services.AddApplicationInsightsTelemetry();

            #endregion

            #region Hosted Services

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>(); 
            services.AddHostedService<AutomatedTasksHostedService>();

            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger(c =>
            {
                c.RouteTemplate = "swagger/{documentName}/swagger.json";
            });
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "AbaToday");
            });

            using var scope = app.ApplicationServices.CreateScope();
            var initialDataSeeder = scope.ServiceProvider.GetService<InitialDataSeeder>();
            var userSeeder = scope.ServiceProvider.GetService<ApplicationUserSeeder>();
            var actionsSeeder = scope.ServiceProvider.GetService<ApplicationActionsSeeder>();
            initialDataSeeder.SeedData().Wait();
            userSeeder.SeedUsersAndRoles().Wait();
            actionsSeeder.SeedActions().Wait();

            app.UseHttpsRedirection();

            if (!Directory.Exists(Path.Combine(env.WebRootPath, "uploads")))
            {
                Directory.CreateDirectory(Path.Combine(env.WebRootPath, "uploads"));
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.WebRootPath, "uploads")),
                RequestPath = new PathString("/Uploads")
            });
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    "default",
                    "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    //This line should be enabled if running the front-end with just F5 (takes longer)
                    //spa.UseAngularCliServer(npmScript: "start");
                    //spa.UseAngularCliServer("start");
                    //This line should be enabled if running the front-end with ng serve
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}