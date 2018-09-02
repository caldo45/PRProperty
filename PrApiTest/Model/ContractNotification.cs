using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApi.Model
{
    [Table("contract_notifications")]
    public class ContractNotification
    {
        [Column("contract_notification_id")]
        public int Id { get; set; }

        [Column("contract_id")]
        public int ContractId { get; set; }

        public virtual Contract Contract { get; set; }

        [Column("marked_read")]
        public int MarkedRead { get; set; }

        [Column("contract_notification_type_id")]
        public int ContractNotificationTypeId { get; set; }

        [Column("date_added")]
        public DateTime DateAdded { get; set; }

        public virtual ContractNotificationType ContractNotificationType { get; set; }

        [Column("deleted")]
        public int Deleted { get; set; }


    }
}
