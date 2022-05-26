using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbaToday.Web.Dtos
{
    public class ActionDto
    {
        public string Id { get; set; }

        public string ModuleName { get; set; }

        public string ActionName { get; set; }
        public string RoleId { get; set; }

    }
}
