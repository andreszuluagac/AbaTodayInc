using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using AbaToday.Domain.EnviaShipping.Request;
using AbaToday.Domain.EnviaShipping.Response;
using AbaToday.Helpers.ContractResolvers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace AbaToday.Repos.HttpServices
{
    public class EnviaHttpService : IEnviaHttpService
    {
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly JsonSerializerSettings _deserializerSettings;
        private readonly HttpClient _httpClient;
        private readonly string _token;
        private readonly string _quoteEndpoint;
        private readonly string _createEndpoint;

        public EnviaHttpService(IConfiguration configuration)
        {
            _serializerSettings =
                new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    NullValueHandling = NullValueHandling.Ignore
                };
            //Settings to be used if response includes underscore instead of camelCase
            _deserializerSettings =
                new JsonSerializerSettings
                {
                    ContractResolver = new UnderscorePropertyNamesContractResolver()
                };

            _token = configuration["EnviaShipping:Token"];
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_token}");

            _quoteEndpoint = configuration["EnviaShipping:QuoteEndpoint"];
            _createEndpoint = configuration["EnviaShipping:CreateEndpoint"];
        }

        public QuoteResponse QuoteShippingMethods(ShippingRequest request)
        {
            var jsonObject = JsonConvert.SerializeObject(request, _serializerSettings);
            HttpContent content = new StringContent(jsonObject, Encoding.UTF8, "application/json");

            var httpResponse = _httpClient.PostAsync(_quoteEndpoint, content).Result;
            var stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var searchResponse = JsonConvert.DeserializeObject<QuoteResponse>(stringResponse);

            return searchResponse;
        }

        public CreateResponse CreateShippingLabels(ShippingRequest request)
        {
            var jsonObject = JsonConvert.SerializeObject(request, _serializerSettings);
            HttpContent content = new StringContent(jsonObject, Encoding.UTF8, "application/json");

            var httpResponse = _httpClient.PostAsync(_createEndpoint, content).Result;
            var stringResponse = httpResponse.Content.ReadAsStringAsync().Result;
            var searchResponse = JsonConvert.DeserializeObject<CreateResponse>(stringResponse);

            return searchResponse;
        }
    }
}