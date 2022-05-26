namespace AbaToday.Domain.EnviaShipping.Response
{
    public class CostSummary
    {
        public int Quantity { get; set; }
        public double BasePrice { get; set; }
        public int ExtendedFare { get; set; }
        public int Insurance { get; set; }
        public int AdditionalServices { get; set; }
        public double TotalPrice { get; set; }
        public string Currency { get; set; }
        public bool CustomKey { get; set; }
        public int CashOnDeliveryCommission { get; set; }
        public int CashOnDeliveryAmount { get; set; }
        public int CustomKeyCommission { get; set; }
        public int SmsCommission { get; set; }
        public int ImportFee { get; set; }
        public int Taxes { get; set; }
        public int WhatsappCommission { get; set; }
        public object Folio { get; set; }
    }
}