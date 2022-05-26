using System.ComponentModel.DataAnnotations;

namespace AbaToday.Web.Dtos
{
    public class ContactUsDto
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public string Message { get; set; }
    }
}