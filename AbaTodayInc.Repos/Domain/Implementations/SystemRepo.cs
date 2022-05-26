using System;
using System.Collections.Generic;
using System.Linq;
using AbaToday.DataAccess;
using AbaToday.Domain.Data;
using AbaToday.Repos.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AbaToday.Repos.Domain.Implementations
{
    public class SystemRepo : ISystemRepo
    {
        private readonly ApplicationDbContext _context;

        public SystemRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        
        //public IEnumerable<SystemSettingList> GetCurrencies()
        //{
        //    return _context.SystemSettingLists
        //        .OrderBy(a => a.Value)
        //        .Where(a => a.SystemSettingId == "SCUR");
        //}

        //public SystemSettingValue AddSystemSettingValue(SystemSettingValue systemSettingValue)
        //{
        //    return _context.SystemSettingValues.Add(systemSettingValue).Entity;
        //}

        //public SystemSettingValue GetSystemSettingValue(string systemSettingId, Guid subscriptionId)
        //{
        //    var systemSettingValue = _context.SystemSettingValues.FirstOrDefault(a => a.SystemSettingId == systemSettingId && a.SubscriptionId == subscriptionId);

        //    return systemSettingValue;
        //}

        //public SystemSettingList GetSystemSettingListValue(string systemSettingId, Guid subscriptionId)
        //{
        //    var systemSettingValue = _context.SystemSettingValues.FirstOrDefault(a => a.SystemSettingId == systemSettingId && a.SubscriptionId == subscriptionId);
        //    if (systemSettingValue == null)
        //    {
        //        return null;
        //    }

        //    var systemSettingList =
        //        _context.SystemSettingLists.FirstOrDefault(a => a.SystemSettingId == systemSettingId && a.Id == systemSettingValue.Value);
        //    return systemSettingList;
        //}


        //public void DeleteSystemSettingValue(Guid id)
        //{
        //    var systemSettingValue = _context.SystemSettingValues.Find(id);

        //    if (systemSettingValue == null)
        //    {
        //        return;
        //    }

        //    _context.SystemSettingValues.Remove(systemSettingValue);
        //}

        //public IEnumerable<SystemProcess> GetSystemProcesses()
        //{
        //    return _context.SystemProcesses.OrderBy(a => a.Name);
        //}

        //public IEnumerable<SystemProcessTask> GetSystemProcessTasksByProcessId(string id)
        //{
        //    return _context.SystemProcessTasks
        //        .Include(a => a.SystemTask)
        //        .Where(a => a.SystemProcessId == id)
        //        .OrderBy(a => a.Order);
        //}

        //public void SaveChanges()
        //{
        //    throw new NotImplementedException();
        //}
    }
}