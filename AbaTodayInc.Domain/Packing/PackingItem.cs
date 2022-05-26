using System;
using System.Linq;

namespace AbaToday.Domain.Packing
{
    public class PackingItem
    {
        public string Id { get; set; }
        public Guid? ProductId { get; set; }
        public string Name { get; set; }
        public double Weight { get; set; }
        public int Quantity { get; set; }
        public Vector3 PackedDimensions { get; set; }
        public Vector3 PackedCoordinates { get; set; }

        //Public fields, so they don't get serialized in the response
        public readonly Vector3[] Orientations;
        public readonly Vector3 Dimensions;

        public PackingItem(string id, Guid? productId, string name, Vector3 dimensions, int quantity, double weight) : this(
            id,
            productId,
            name,
            dimensions,
            quantity,
            weight,
            new Vector3(0, 0, 0))
        {
        }

        public PackingItem(string id, Guid? productId, string name, Vector3 dimensions, int quantity, double weight, Vector3 coordinates)
        {
            Id = id;
            ProductId = productId;
            Name = name;
            Dimensions = dimensions;
            Quantity = quantity;
            PackedDimensions = dimensions;
            PackedCoordinates = coordinates;
            Weight = weight;

            Orientations = new[]
            {
                Dimensions,
                new Vector3(Dimensions.X, Dimensions.Z, Dimensions.Y),
                new Vector3(Dimensions.Y, Dimensions.X, Dimensions.Z),
                new Vector3(Dimensions.Y, Dimensions.Z, Dimensions.X),
                new Vector3(Dimensions.Z, Dimensions.X, Dimensions.Y),
                new Vector3(Dimensions.Z, Dimensions.Y, Dimensions.X)
            };
        }

        public bool Fits(Vector3 gap)
        {
            return Orientations.Any(dims => dims.Fits(gap));
        }
    }
}
