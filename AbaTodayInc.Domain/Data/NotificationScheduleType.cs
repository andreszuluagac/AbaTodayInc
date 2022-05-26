using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class NotificationScheduleType
    {
        [Required] [MaxLength(4)] public string Id { get; set; }

        [Required] [MaxLength(256)] public string Name { get; set; }

        [Required] public short Order { get; set; }

        public ICollection<Notification> Notifications { get; set; }
    }
}