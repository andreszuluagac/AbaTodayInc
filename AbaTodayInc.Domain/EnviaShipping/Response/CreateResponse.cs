using System.Collections.Generic;

namespace AbaToday.Domain.EnviaShipping.Response
{
    public class CreateResponse
    {
        public List<ShippingLabel> Data { get; set; }
        public ErrorResponse Error { get; set; }
    }
}