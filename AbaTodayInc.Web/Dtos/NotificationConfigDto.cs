using AbaToday.Web.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbaToday.Web.Dtos
{
    public class NotificationConfigDto
    {
        public IEnumerable<NotificationDto> Notifications { get; set; }
        public IEnumerable<BasicSelectListItemDto> ScheduleTypes { get; set; }
        public IEnumerable<BasicSelectListItemDto> Roles { get; set; }
    }
}
