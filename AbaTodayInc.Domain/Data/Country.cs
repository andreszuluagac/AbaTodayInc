using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class Country
    {
        [Required]
        [MaxLength(4)] 
        public string Id { get; set; }

        [Required]
        [MaxLength(64)]
        public string Name { get; set; }

        [Required]
        [MaxLength(4)]
        public string Code { get; set; }

    }
}
