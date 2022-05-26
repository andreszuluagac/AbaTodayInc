using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace AbaToday.Helpers
{
    public class SmsSender : ISmsSender
    {
        private readonly string _from;
        private readonly ILogger _logger;

        public SmsSender(ILogger logger)
        {
            _logger = logger;
        }

        public SmsSender(IConfiguration configuration)
        {
            TwilioClient.Init(configuration["Twilio:AccountSid"], configuration["Twilio:AuthToken"]);
            _from = configuration["Twilio:PhoneNumber"];
        }

        public async Task SendMessageAsync(string to, string body)
        {
            try
            {
                await MessageResource.CreateAsync(
                    new PhoneNumber(to),
                    from: new PhoneNumber(_from),
                    body: body);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending SMS to {to}. {ex.Message}");
            }
        }
    }
}