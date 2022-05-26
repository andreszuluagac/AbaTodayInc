using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbaToday.DataAccess;
using AbaToday.Domain.Data;
using AbaToday.Helpers;
using AbaToday.Repos.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AbaToday.Repos.Domain.Implementations
{
    public class NotificationsRepo : INotificationsRepo
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly UserManager<ApplicationUser> _userManager;

        public NotificationsRepo(
            ApplicationDbContext context,
            IEmailSender emailSender,
            ISmsSender smsSender,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _userManager = userManager;
        }

        public IEnumerable<NotificationType> GetNotificationTypes()
        {
            return _context.NotificationTypes;
        }

        public IEnumerable<Notification> GetNotifications()
        {
            return _context.Notifications.Include(a => a.NotificationScheduleType);
        }

        public void Delete(Guid id)
        {
            var notification = _context.Notifications.Find(id);
            if (notification != null)
            {
                _context.Notifications.Remove(notification);
            }
        }

        public IEnumerable<NotificationScheduleType> GetScheduleTypes()
        {
            return _context.NotificationScheduleTypes.OrderBy(a => a.Order);
        }

        public Notification GetById(Guid id)
        {
            return _context.Notifications.FirstOrDefault(a => a.Id == id);
        }

        public void Add(Notification notification)
        {
            _context.Notifications.Add(notification);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public async Task NotifyAsync(string notificationTypeId, string smsText, string emailSubject, string emailBody)
        {
            var notification = _context.Notifications
                .Include(a => a.NotificationType)
                .FirstOrDefault(a => a.NotificationTypeId == notificationTypeId);

            if (notification == null)
            {
                return;
            }


            var roles = notification.Roles.Split(",");
            foreach (var role in roles)
            {
                var users = _userManager.GetUsersInRoleAsync(role).Result;
                foreach (var user in users)
                {
                    if (notification.ShouldSendSms)
                    {
                        if (!string.IsNullOrEmpty(user.PhoneNumber))
                        {
                            await _smsSender.SendMessageAsync(user.PhoneNumber, smsText);
                        }
                    }

                    if (notification.ShouldSendEmail)
                    {
                        await _emailSender.SendEmailAsync(user.Email, emailSubject, emailBody);
                    }
                }
            }
        }
    }
}