using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbaToday.Web.Dtos
{
    public class ManageProfileDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public string FullName { get; set; }

        public string PhoneNumber { get; set; }
        public string PhoneNumberCode { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        public string Image { get; set; }

        public IList<string> Roles { get; set; }

    }
}
