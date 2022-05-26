using System;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class ApiUsage : BaseEntity
    {
        [Required]
        [MaxLength(1024)]
        public string Endpoint { get; set; }

        public DateTime RequestDateTime { get; set; }
        
        public DateTime ResponseDateTime { get; set; }
        
        [Required]
        [MaxLength(8)]
        public string HttpResponseCode { get; set; }
        
        [MaxLength(2056)]
        public string ExceptionMessage { get; set; }
    }
}