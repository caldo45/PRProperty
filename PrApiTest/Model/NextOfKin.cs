using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Model
{
    [Table("next_of_kin")]
    public class NextOfKin
    {

        [Column("next_of_kin_id")]
        public int Id { get; set; }

        [Column("client_id")]
        public int ClientId { get; set; }

        public virtual Client Client { get; set; }

        [Column("first_name")]
        public string FirstName { get; set; }

        [Column("last_name")]
        public string LastName { get; set; }

        [Column("phone")]
        public string Phone { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("relationship")]
        public string Relationship { get; set; }
    }
}
