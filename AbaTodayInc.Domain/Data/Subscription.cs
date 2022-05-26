using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class Subscription
    {
        public Subscription()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        
        public Guid SubscriptionTypeId { get; set; }
        public SubscriptionType SubscriptionType { get; set; }

        [Required]
        [MaxLength(256)]
        public string CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

        [MaxLength(256)]
        public string UpdatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public ICollection<ApplicationUser> Users { get; set; }
    }
}
