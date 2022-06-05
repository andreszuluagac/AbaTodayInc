using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AbaToday.Domain.Data
{
    public class Customer
    {
        public Guid Id { get; set; }
        [Required]
        [MaxLength(64)]
        public string Name { get; set; }
        [Required]
        [MaxLength(256)]
        public string Email { get; set; }
        public string PhotoUrl { get; set; }
        public string PasswordHash { get; set; }
        public bool IsSubscribed { get; set; }
    }
}
