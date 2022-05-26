using System.Threading.Tasks;
using AbaToday.Domain.Data;
using Microsoft.EntityFrameworkCore;

namespace AbaToday.DataAccess.Seeders
{
    public class InitialDataSeeder
    {
        private readonly ApplicationDbContext _context;

        public InitialDataSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedData()
        {
            #region Countries

            await CreateCountry("USA", "USA", "57");
            await CreateCountry("COL", "Colombia", "1");

            #endregion
        }

        private async Task CreateCountry(string id, string name, string code)
        {
            var country = await _context.Countries.FirstOrDefaultAsync(a => a.Id == id);
            if (country == null)
            {
                country = new Country
                {
                    Id = id,
                    Name = name,
                    Code = code
                };
                await _context.Countries.AddAsync(country);
                await _context.SaveChangesAsync();
            }
        }

    }
}