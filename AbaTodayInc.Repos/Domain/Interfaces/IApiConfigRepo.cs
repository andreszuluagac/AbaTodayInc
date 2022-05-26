using System;
using System.Collections.Generic;
using AbaToday.Domain.Data;

namespace AbaToday.Repos.Domain.Interfaces
{
    public interface IApiConfigRepo
    {
        ApiKey AddApiKey(ApiKey apiKey);
        ApiKey GetApiKeyBySubscriptionId(Guid subscriptionId);
        void DeleteApiKeyBySubscriptionId(Guid id);
        IEnumerable<ApiUsage> GetApiUsageBySubscriptionId(Guid id);
        Guid? ValidateApiKey(string key);
        void LogApiUsage(ApiUsage apiUsage);
        string GenerateApiKey();
        void SaveChanges();
    }
}