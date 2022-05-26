using System;
using System.Collections.Generic;
using AbaToday.Domain.Data;

namespace AbaToday.Repos.Domain.Interfaces
{
    public interface IMasterEntityRepo
    {
        IEnumerable<Country> GetAllCountries();
        void SaveChanges();
    }
}
