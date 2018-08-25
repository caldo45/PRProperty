using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Model
{
    [Table("client_types")]
    public class ClientType
    {
        [Column("client_type_id")]
        public int Id { get; set; }

        [Column("type")]
        public String Type { get; set; }

    }
}
