using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbaToday.Domain.Data
{
    public class SubscriptionType : BaseEntity
    {
        [Required]
        [MaxLength(32)]
        public string Name { get; set; }
        
        [MaxLength(2048)]
        public string Description { get; set; }
        
        [Column(TypeName = "decimal(18,2)")] 
        public decimal MonthlyValue { get; set; }

        [Column(TypeName = "decimal(18,2)")] 
        public decimal FirstYearValue { get; set; }

        [Column(TypeName = "decimal(18,2)")] 
        public decimal SecondYearValue { get; set; }

        [Column(TypeName = "decimal(18,2)")] 
        public decimal ThirdYearOnValue { get; set; }

        public bool IsActive { get; set; }

        public DateTime StartDate { get; set; }
        
        public DateTime? EndDate { get; set; }
        
        public ICollection<Subscription> Subscriptions { get; set; }
        
        public ICollection<SubscriptionTypeMenuItem> SubscriptionTypeMenuItems { get; set; }
    }
}