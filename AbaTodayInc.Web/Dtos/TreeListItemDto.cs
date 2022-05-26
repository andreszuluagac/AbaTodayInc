using System;
using System.Collections.Generic;

namespace AbaToday.Web.Dtos
{
    public class TreeListItemDto
    {
        public string Email { get; set; }
        public string Label { get; set; }
        public string Data { get; set; }
        public string ExpandedIcon { get; set; }
        public string CollapsedIcon { get; set; }
        public bool Leaf { get; set; }
        public bool Expanded { get; set; }
        public bool HasRelatedData { get; set; }
        public IList<TreeListItemDto> Children { get; set; }
    }
}