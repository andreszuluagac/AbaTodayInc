using AbaToday.DataAccess;
using AbaToday.Domain.Data;
using AbaTodayInc.Repos.Domain.Interfaces;
using System;

namespace AbaTodayInc.Repos.Domain.Implementations
{
    public class CustomerRepo : ICustomerRepo
    {
        private readonly ApplicationDbContext _context;
        public CustomerRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool Add(Customer customer)
        {
            try
            {
                _context.Customers.Add(customer);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
