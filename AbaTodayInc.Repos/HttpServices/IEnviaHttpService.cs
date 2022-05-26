using AbaToday.Domain.EnviaShipping.Request;
using AbaToday.Domain.EnviaShipping.Response;

namespace AbaToday.Repos.HttpServices
{
    public interface IEnviaHttpService
    {
        QuoteResponse QuoteShippingMethods(ShippingRequest request);
        CreateResponse CreateShippingLabels(ShippingRequest request);
    }
}