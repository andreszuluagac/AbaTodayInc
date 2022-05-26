using System.Collections.Generic;

namespace AbaToday.Domain.EnviaShipping.Request
{
    public class ShippingRequest
    {
        public ShippingAddress Origin { get; set; }
        public ShippingAddress Destination { get; set; }
        public List<Package> Packages { get; set; }
        public Shipment Shipment { get; set; }
        public Settings Settings { get; set; }
    }
}