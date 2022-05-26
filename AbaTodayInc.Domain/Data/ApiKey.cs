using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class ApiKey : BaseEntity
    {
        [Required]
        [MaxLength(128)]
        public string Key { get; set; }
    }
}