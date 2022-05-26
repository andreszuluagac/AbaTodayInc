using System;
using System.Collections.Generic;

namespace AbaToday.Domain.Packing
{
    public class CartonStockPackingResult
    {
        public CartonStockPackingResult()
        {
            PackedCartonStocks = new List<PackedCartonStock>();
            UnpackedItems = new List<PackingItem>();
            SkippedItems = new List<PackingItem>();
        }
        public IList<PackedCartonStock> PackedCartonStocks { get; set; }
        public IList<PackingItem> UnpackedItems { get; set; }
        public IList<PackingItem> SkippedItems { get; set; }
    }
}
