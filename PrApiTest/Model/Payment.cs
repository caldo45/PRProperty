using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApi.Model
{
    [Table("payments")]
    public class Payment
    {

        [Column("payment_id")]
        public int Id { get; set; }

        [Column("amount")]
        public Double Amount { get; set; }

        [Column("date_recieved")]
        public DateTime Date { get; set; }

        [Column("payment_reference")]
        public String Reference { get; set; }

        [Column("contract_id")]
        public int ContractId { get; set; }

        public virtual Contract Contract { get; set; }
    }
}
