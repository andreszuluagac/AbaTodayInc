using AbaToday.Domain.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace AbaTodayInc.Repos.Domain.Interfaces
{
    public interface ICustomerRepo
    {
        bool Add(Customer customer);
    }
}
