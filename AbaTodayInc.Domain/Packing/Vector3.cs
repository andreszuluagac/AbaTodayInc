namespace AbaToday.Domain.Packing
{
    public class Vector3
    {
        public double X { get; set; }
        public double Y { get; set; }
        public double Z { get; set; }

        public Vector3()
        {
            X = 0;
            Y = 0;
            Z = 0;
        }

        public Vector3(double x, double y, double z)
        {
            X = x;
            Y = y;
            Z = z;
        }

        public static Vector3 Zero => new Vector3(0, 0, 0);

        public bool Fits(Vector3 gap) => (X <= gap.X && Y <= gap.Y && Z <= gap.Z);

        public override string ToString() => $"({X},{Y},{Z})";
    }
}
