using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class NotificationType
    {
        [Required] [MaxLength(4)] public string Id { get; set; }

        [Required] [MaxLength(256)] public string NameAndPath { get; set; }

        public bool IsAutomatedTask { get; set; }

        public ICollection<Notification> Notifications { get; set; }
    }
}