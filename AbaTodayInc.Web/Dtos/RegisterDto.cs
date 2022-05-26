using System.ComponentModel.DataAnnotations;

namespace AbaToday.Web.Dtos
{
    public class RegisterDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }

        [Required] public string FullName { get; set; }

        public string PhoneNumber { get; set; }
        public string PhoneNumberCode { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Password { get; set; }
        public string Code { get; set; }

    }
}