using System;

namespace AbaToday.Web.Dtos
{
    public class NotificationDto
    {
        public string Id { get; set; }
        public string NameAndPath { get; set; }
        public bool IsAutomatedTask { get; set; }
        public bool HasNotificationConfigured { get; set; }
        public Guid? NotificationId { get; set; }
        public bool? ShouldSendSms { get; set; }
        public bool? ShouldSendEmail { get; set; }
        public string Roles { get; set; }
        public string ScheduleTypeId { get; set; }
        public string ScheduleTypeName { get; set; }
    }
}