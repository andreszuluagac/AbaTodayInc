using System.Collections.Generic;

namespace AbaToday.Web.Dtos
{
    public class EntityListDto<T>
    {
        public IEnumerable<T> Entities { get; set; }
        public int Count { get; set; }
    }
}