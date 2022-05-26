using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbaToday.Helpers
{
    public interface ISmsSender
    {
        Task SendMessageAsync(string to, string body);
    }
}
