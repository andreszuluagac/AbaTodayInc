using System.Collections.Generic;
using AbaToday.Domain.EnviaShipping.Request;

namespace AbaToday.Domain.EnviaShipping.Response
{
    public class QuoteResponse
    {
        public List<ShippingMethod> Data { get; set; }
        public ErrorResponse Error { get; set; }
        public List<Package> Packages { get; set; }
    }
}