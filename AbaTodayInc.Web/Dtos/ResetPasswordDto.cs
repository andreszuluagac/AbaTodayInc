using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbaToday.Web.Dtos
{
    public class ResetPasswordDto
    {
        public string Code { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
