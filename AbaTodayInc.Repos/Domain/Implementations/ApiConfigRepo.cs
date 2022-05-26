using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using AbaToday.DataAccess;
using AbaToday.Domain.Data;
using AbaToday.Repos.Domain.Interfaces;

namespace AbaToday.Repos.Domain.Implementations
{
    public class ApiConfigRepo : IApiConfigRepo
    {
        private readonly ApplicationDbContext _context;

        public ApiConfigRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public ApiKey AddApiKey(ApiKey apiKey)
        {
            return _context.ApiKeys.Add(apiKey).Entity;
        }

        public ApiKey GetApiKeyBySubscriptionId(Guid subscriptionId)
        {
            return _context.ApiKeys.FirstOrDefault(a => a.SubscriptionId == subscriptionId);
        }
        
        public void DeleteApiKeyBySubscriptionId(Guid id)
        {
            //This should always return one record, but just in case
            var apiKeys = _context.ApiKeys.Where(a => a.SubscriptionId == id);
            _context.ApiKeys.RemoveRange(apiKeys);
        }

        public IEnumerable<ApiUsage> GetApiUsageBySubscriptionId(Guid id)
        {
            return _context.ApiUsages
                .Where(a => a.SubscriptionId == id)
                .OrderBy(a => a.Endpoint)
                .ThenBy(a => a.RequestDateTime);
        }

        public Guid? ValidateApiKey(string key)
        {
            return _context.ApiKeys.FirstOrDefault(a => a.Key == key)?.SubscriptionId;
        }

        public void LogApiUsage(ApiUsage apiUsage)
        {
            _context.ApiUsages.Add(apiUsage);
        }

        public string GenerateApiKey()
        {
            var key = new byte[32];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(key);
            }
            var apiKey = Convert.ToBase64String(key).Replace("/", "");
            
            return apiKey;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}