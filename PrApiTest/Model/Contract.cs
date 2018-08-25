using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Model
{
    public class Contract
    {
        [Column("contract_id")]
        public int Id { get; set; }

        [Column("room_id")]
        public int RoomId { get; set; }

        public virtual Room Room { get; set; }

        [Column("tenant_id")]
        public int ClientId { get; set; }

        public virtual Client Client { get; set; }

        [Column("date_from")]
        public DateTime DateFrom { get; set; }

        [Column("date_to")]
        public DateTime DateTo { get; set; }

        [Column("monthly_amount")]
        public int MonthlyAmount { get; set; }

        [Column("payment_date")]
        public String PaymentDate { get; set; }

        [Column("payment_type_id")]
        public int PaymentTypeId { get; set; }

        public virtual PaymentType PaymentType { get; set; }

        [Column("deposit_paid")]
        public String DepositPaid { get; set; }

        [Column("contract_path")]
        public String ContractPath { get; set; }

        [Column("payment_reference")]
        public String PaymentReference { get; set; }
    }
}
