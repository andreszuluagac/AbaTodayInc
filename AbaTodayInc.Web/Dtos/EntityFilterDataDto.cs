using System;
using System.Collections.Generic;

namespace AbaToday.Web.Dtos
{
    public class EntityFilterDataDto
    {
        public Dictionary<string, FilterMetadata> ColumnFilters { get; set; }
        public int? NumberOfRecords { get; set; }
        public string AggregationFunction { get; set; }
    }
}
