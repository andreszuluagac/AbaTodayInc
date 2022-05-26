using System.Collections.Generic;

namespace AbaToday.Web.Dtos
{
    public class LoginResponseDto
    {
        public string UserName { get; set; }
        public object IdentityToken { get; set; }
        public IList<string> Roles { get; set; }
        public string FullName { get; set; }

        public bool FirstLogin { get; set; }
    }
}
