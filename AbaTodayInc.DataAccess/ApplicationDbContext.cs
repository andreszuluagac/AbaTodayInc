using AbaToday.Domain.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Cryptography;

namespace AbaToday.DataAccess
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Disable cascade deletion on:
            //Subscriptions from SubscriptionTypes
            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.SubscriptionType)
                .WithMany(s => s.Subscriptions)
                .OnDelete(DeleteBehavior.Restrict);

        }

        public DbSet<ApiKey> ApiKeys { get; set; }
        public DbSet<ApiUsage> ApiUsages { get; set; }

        public DbSet<ApplicationAction> ApplicationActions { get; set; }
        public DbSet<RoleAction> RoleActions { get; set; }
        public DbSet<NotificationType> NotificationTypes { get; set; }
        public DbSet<NotificationScheduleType> NotificationScheduleTypes { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<SubscriptionType> SubscriptionTypes { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<SubscriptionTypeMenuItem> SubscriptionTypeMenuItems { get; set; }
    }
}
