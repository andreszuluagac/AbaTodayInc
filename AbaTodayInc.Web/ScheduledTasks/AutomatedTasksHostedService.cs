using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AbaToday.Domain.Data;
using AbaToday.Repos.Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using AbaToday.Web.Dtos;
using AbaToday.Web.ClientHelpers;

namespace AbaToday.Web.ScheduledTasks
{
    public class AutomatedTasksHostedService : IHostedService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly double _evhdTimeSpan;
        private readonly double _ev1dTimeSpan;
        private readonly double _ev2dTimeSpan;
        private readonly double _ev1wTimeSpan;
        private readonly double _ev2wTimeSpan;
        private Timer _evhdTimer;
        private Timer _ev1dTimer;
        private Timer _ev2dTimer;
        private Timer _ev1wTimer;
        private Timer _ev2wTimer;
        private readonly IConfiguration _config;

        public AutomatedTasksHostedService(
            IConfiguration config,
            IServiceScopeFactory scopeFactory)
        {
            _config = config;
            _evhdTimeSpan = Convert.ToDouble(config["AutomatedTasks:EVHD"]);
            _ev1dTimeSpan = Convert.ToDouble(config["AutomatedTasks:EV1D"]);
            _ev2dTimeSpan = Convert.ToDouble(config["AutomatedTasks:EV2D"]);
            _ev1wTimeSpan = Convert.ToDouble(config["AutomatedTasks:EV1W"]);
            _ev2wTimeSpan = Convert.ToDouble(config["AutomatedTasks:EV2W"]);
            _scopeFactory = scopeFactory;
            //var request = contextAccessor.HttpContext.Request;
            //_baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _evhdTimer = new Timer(async a => await DoWork("EVHD"), null, TimeSpan.Zero, TimeSpan.FromDays(_evhdTimeSpan));
            _ev1dTimer = new Timer(async a => await DoWork("EV1D"), null, TimeSpan.Zero, TimeSpan.FromDays(_ev1dTimeSpan));
            _ev2dTimer = new Timer(async a => await DoWork("EV2D"), null, TimeSpan.Zero, TimeSpan.FromDays(_ev2dTimeSpan));
            _ev1wTimer = new Timer(async a => await DoWork("EV1W"), null, TimeSpan.Zero, TimeSpan.FromDays(_ev1wTimeSpan));
            _ev2wTimer = new Timer(async a => await DoWork("EV2W"), null, TimeSpan.Zero, TimeSpan.FromDays(_ev2wTimeSpan));
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _evhdTimer?.Change(Timeout.Infinite, 0);
            _ev1dTimer?.Change(Timeout.Infinite, 0);
            _ev2dTimer?.Change(Timeout.Infinite, 0);
            _ev1wTimer?.Change(Timeout.Infinite, 0);
            _ev2wTimer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        private async Task DoWork(string scheduleType)
        {
            using var scope = _scopeFactory.CreateScope();
            var abaTodayIncClientHelpers  = scope.ServiceProvider.GetRequiredService<IAbaTodayIncClientHelpers>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<AutomatedTasksHostedService>>();

            try
            {
                
            }
            catch (Exception e)
            {
                logger.LogError(e, "There was an error fetching automated tasks");
                //throw;
            }
        }
    }
}
