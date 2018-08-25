using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Model
{
    [Table("leases")]
    public class Lease
    {
        [Column("lease_id")]
        public int Id { get; set; }

        [Column("property_id")]
        public int PropertyId { get; set; }

        public virtual Property Property { get; set; }

        [Column("date_from")]
        public String DateFrom { get; set; }

        [Column("date_to")]
        public String DateTo { get; set; }

        [Column("amount")]
        public int AmountMonthly { get; set; }


    }
}
