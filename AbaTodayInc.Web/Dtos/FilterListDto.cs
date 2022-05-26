using System.Collections.Generic;

namespace AbaToday.Web.Dtos
{
    public class FilterListDto
    {
        /// <summary>
        /// List names: Countries, YesNo
        /// </summary>
        public string ListName { get; set; }
        public IEnumerable<FilterListElementDto> Elements { get; set; }
    }
}
