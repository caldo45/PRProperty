using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApi.Model
{
    [Table("clients")]
    public class Client
    {

        [Column("client_id")]
        public int Id { get; set; }

        [Column("first_name")]
        public String FirstName { get; set; }

        [Column("last_name")]
        public String LastName { get; set; }

        [Column("dob")]
        public DateTime Dob { get; set; }

        [Column("phone")]
        public String Phone { get; set; }

        [Column("email")]
        public String Email { get; set; }

        [Column("image_path")]
        public String ImagePath { get; set; }

        [ForeignKey("client_type_ids")]
        [Column("client_type_id")]
        public int ClientTypeId { get; set; }

        public virtual ClientType ClientType { get; set; }



    }
}
