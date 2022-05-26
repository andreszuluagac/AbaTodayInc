using System;

namespace AbaToday.Helpers
{
    public static class MathExtensions
    {
        public static decimal GetPercentage(this decimal? number, decimal? ofNumber)
        {
            if (!ofNumber.HasValue || !number.HasValue || number == 0)
            {
                return 0;
            }

            return ofNumber.Value * 100 / number.Value;
        }
    }
}
