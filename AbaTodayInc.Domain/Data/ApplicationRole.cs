using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        [MaxLength(256)]
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
