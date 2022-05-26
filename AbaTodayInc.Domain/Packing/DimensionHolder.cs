namespace AbaToday.Domain.Packing
{
    public class DimensionHolder
    {
        public PackingItem PackingItem { get; set; }
        public Vector3 Dimensions { get; set; }

        public DimensionHolder(PackingItem packingItem, Vector3 dimensions)
        {
            PackingItem = packingItem;
            Dimensions = dimensions;
        }
    }
}
