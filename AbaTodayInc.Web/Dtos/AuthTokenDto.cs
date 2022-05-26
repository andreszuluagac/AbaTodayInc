using System.ComponentModel.DataAnnotations;

namespace AbaToday.Web.Dtos
{
    public class AuthTokenDto
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Code { get; set; }
    }
}