using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class Notification : BaseEntity
    {
        public bool ShouldSendSms { get; set; }

        public bool ShouldSendEmail { get; set; }

        public string Roles { get; set; }

        [Required]
        [MaxLength(4)]
        public string NotificationTypeId { get; set; }
        public NotificationType NotificationType { get; set; }

        [MaxLength(4)]
        public string NotificationScheduleTypeId { get; set; }
        public NotificationScheduleType NotificationScheduleType { get; set; }
    }
}