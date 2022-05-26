using System;

namespace AbaToday.Domain.EnviaShipping.Request
{
    public class Package
    {
        public string Content { get; set; }
        public int Amount { get; set; }
        public string Type { get; set; }
        public double Weight { get; set; }
        public int Insurance { get; set; }
        public int DeclaredValue { get; set; }
        public string WeightUnit { get; set; }
        public string LengthUnit { get; set; }
        public Dimensions Dimensions { get; set; }
        //AbaToday properties
        public Guid? CartonStockId { get; set; }
        public Guid? ProductId { get; set; }
    }
}