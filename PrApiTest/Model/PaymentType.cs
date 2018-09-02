using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApi.Model
{
    [Table("payment_types")]
    public class PaymentType
    {

        [Column("payment_type_id")]
        public int Id { get; set; }

        [Column("payment_type")]
        public String Type { get; set; }


    }
}
