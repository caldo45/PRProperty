using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Model
{
    [Table("payments")]
    public class Payment
    {

        [Column("payment_id")]
        public int Id { get; set; }

        [Column("tenant_id")]
        public String ClientId { get; set; }

        public virtual Client Client { get; set; }

        [Column("date_recieved")]
        public String DateRecieved { get; set; }

        [Column("payment_reference")]
        public String PaymentReference { get; set; }
    }
}
