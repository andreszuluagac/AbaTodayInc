namespace AbaToday.Helpers
{
    public static class StringExtension
    {
        public static string GetLast(this string source, int length, char? trailingChar = null)
        {
            if (length >= source.Length)
            {
                return trailingChar.HasValue ? source.PadLeft(length, trailingChar.Value) : source;
            }
            
            return source[^length..];
        }
    }
}