using System;
using System.Collections.Generic;
using System.Linq;
using AbaToday.DataAccess;
using AbaToday.Domain.Data;
using AbaToday.Helpers;
using AbaToday.Repos.Domain.Interfaces;

namespace AbaToday.Repos.Domain.Implementations
{
    public class MasterEntityRepo : IMasterEntityRepo
    {
        private readonly ApplicationDbContext _context;

        public MasterEntityRepo(
            ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Country> GetAllCountries()
        {
            return _context.Countries.OrderBy(a => a.Name);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();

        }
    }
}
