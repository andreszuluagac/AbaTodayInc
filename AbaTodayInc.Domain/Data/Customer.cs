using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

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
        public string PhoneNumberCode { get; set; }
        public string PhoneNumber { get; set; }
        public string PhotoUrl { get; set; }
        public string PasswordHash { get; set; }
        public bool IsSubscribed { get; set; }
    }
}
