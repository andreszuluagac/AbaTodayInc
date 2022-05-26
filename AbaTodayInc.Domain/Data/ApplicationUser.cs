using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbaToday.Domain.Data
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [Required]
        [MaxLength(256)]
        public string FullName { get; set; }

        [MaxLength(256)]
        public string Title { get; set; }

        [MaxLength(14)]
        public string DaysSchedule { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? TimeScheduleStart { get; set; }

        public DateTime? TimeScheduleEnd { get; set; }

        [MaxLength(64)]
        public string ReportsTo { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? HoursPerWeek { get; set; }

        public bool TrackingHoursMandatory { get; set; }

        [MaxLength(256)]
        public string Image { get; set; }

        public bool IsActive { get; set; }

    }
}
