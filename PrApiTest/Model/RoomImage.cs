using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApi.Model
{
    [Table("room_images")]
    public class RoomImage
    {
        [Column("room_images_id")]
        public int Id { get; set; }

        [Column("room_id")]
        public int RoomId { get; set; }

        public virtual Room Room { get; set; }

        [Column("image_path")]
        public string ImagePath { get; set; }
    }
}
