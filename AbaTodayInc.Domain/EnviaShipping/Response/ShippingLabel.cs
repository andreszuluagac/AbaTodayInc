namespace AbaToday.Domain.EnviaShipping.Response
{
    public class ShippingLabel
    {
        public string Carrier { get; set; }
        public string Service { get; set; }
        public string TrackingNumber { get; set; }
        public string TrackUrl { get; set; }
        public string Label { get; set; }
        public double TotalPrice { get; set; }
        public double CurrentBalance { get; set; }
        public string Currency { get; set; }
    }
}