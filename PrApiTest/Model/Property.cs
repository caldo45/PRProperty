using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Model
{
    public class Property
    {
        [Column("property_id")]
        public int Id { get; set; }

        [Column("first_line_address")]
        public String FirstLineAddress { get; set; }

        [Column("second_line_address")]
        public String SecondLineAddress { get; set; }

        [Column("postcode")]
        public String Postcode { get; set; }

        [Column("longitude")]
        public double Longitude { get; set; }

        [Column("latitude")]
        public double Latitude { get; set; }

        [Column("image_path")]
        public String ImagePath { get; set; }

        [Column("landlord_id")]
        public int LandlordId { get; set; }

        public virtual Client Landlord { get; set; }

        [Column("country")]
        public String Country { get; set; }

        [Column("city")]
        public String City { get; set; }

    }
}
