using System.Collections.Generic;

namespace AbaToday.Domain.EnviaShipping.Response
{
    public class ShippingMethod
    {
        public string Carrier { get; set; }
        public string Service { get; set; }
        public string ServiceDescription { get; set; }
        //public object Zone { get; set; }
        public string DeliveryEstimate { get; set; }
        public DeliveryDate DeliveryDate { get; set; }
        public int Quantity { get; set; }
        //public double BasePrice { get; set; }
        //public int ExtendedFare { get; set; }
        //public int Insurance { get; set; }
        //public int AdditionalServices { get; set; }
        public double TotalPrice { get; set; }
        public string Currency { get; set; }
        //public bool CustomKey { get; set; }
        //public int ImportFee { get; set; }
        //public int Taxes { get; set; }
        //public int CashOnDeliveryCommission { get; set; }
        //public int CashOnDeliveryAmount { get; set; }
        //public int CustomKeyCost { get; set; }
        //public int SmsCost { get; set; }
        //public int WhatsappCost { get; set; }
        //public List<CostSummary> CostSummary { get; set; }
    }
}