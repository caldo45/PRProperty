using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApi.Model
{
    [Table("rooms")]
    public class Room
    {
        [Column("room_id")]
        public int Id { get; set; }

        [Column("property_id")]
        public int PropertyId { get; set; }

        public virtual Property Property { get; set; }

        [Column("name")]
        public String Name { get; set; }
        
    }
}
