using System;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class SubscriptionTypeMenuItem : BaseEntity
    {
        [MaxLength(64)]
        public string MenuItemId { get; set; }
        public MenuItem MenuItem { get; set; } 
        
        public Guid SubscriptionTypeId { get; set; }
        public SubscriptionType SubscriptionType { get; set; }
    }
}