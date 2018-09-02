using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApi.Model
{
    [Table("property_images")]
    public class PropertyImage
    {
        [Column("property_images_id")]
        public int Id { get; set; }

        [Column("property_id")]
        public int PropertyId { get; set; }

        public virtual Property Property { get; set; }

        [Column("image_path")]
        public string ImagePath { get; set; }
    }
}
