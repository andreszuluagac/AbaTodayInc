using System;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public abstract class BaseEntity
    {
        protected BaseEntity()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set;  }

        [Required]
        [MaxLength(256)]
        public string CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

        [MaxLength(256)]
        public string UpdatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public Guid SubscriptionId { get; set; }
    }
}
