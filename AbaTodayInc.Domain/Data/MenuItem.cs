using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class MenuItem
    {
        [Required]
        [MaxLength(64)]
        public string Id { get; set; }
        
        [Required]
        [MaxLength(64)]
        public string Icon { get; set; }
        
        [Required]
        [MaxLength(64)]
        public string RouterLink { get; set; }
        
        [MaxLength(64)]
        public string ParentMenuItemId { get; set; }
        public MenuItem ParentMenuItem { get; set; } 
        
        public ICollection<MenuItem> ChildMenuItems { get; set; }
        
        public int Order { get; set; }
        
        public ICollection<SubscriptionTypeMenuItem> SubscriptionTypeMenuItems { get; set; }
    }
}