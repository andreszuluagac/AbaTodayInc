using System.Collections.Generic;

namespace AbaToday.Web.Dtos
{
    public class MenuItemDto
    {
        public string Label { get; set; }
        public IList<string> RouterLink { get; set; }
        public object QueryParams { get; set; }
        public IList<MenuItemDto> Items { get; set; }
    }
}
