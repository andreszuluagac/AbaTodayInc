using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbaToday.Web.Dtos
{
    public class RoleActionDto
    {
        public Guid ApplicationRoleId { get; set; }
        public string RoleName { get; set; }
        public string ApplicationActionId { get; set; }
        public string ActionName { get; set; }

    }
}
