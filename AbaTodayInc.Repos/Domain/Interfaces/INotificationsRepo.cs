using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AbaToday.Domain.Data;

namespace AbaToday.Repos.Domain.Interfaces
{
    public interface INotificationsRepo
    {
        IEnumerable<NotificationType> GetNotificationTypes();
        IEnumerable<Notification> GetNotifications();
        Notification GetById(Guid id);
        void Add(Notification notification);
        void Delete(Guid id);
        IEnumerable<NotificationScheduleType> GetScheduleTypes();
        void SaveChanges();
        Task NotifyAsync(string notificationTypeId, string smsText, string emailSubject, string emailBody);
    }
}