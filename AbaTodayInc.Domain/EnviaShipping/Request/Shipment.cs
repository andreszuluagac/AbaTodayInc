namespace AbaToday.Domain.EnviaShipping.Request
{
    public class Shipment
    {
        public string Carrier { get; set; }
        public string Service { get; set; }
        public int Type { get; set; }
    }
}