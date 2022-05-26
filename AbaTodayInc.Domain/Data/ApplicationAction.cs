using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class ApplicationAction
    {
        [Required] 
        [MaxLength(8)] 
        public string Id { get; set; }

        [Required]
        [MaxLength(32)]
        public string ModuleName { get; set; }

        [Required]
        [MaxLength(32)]
        public string ActionName { get; set; }
    }
}