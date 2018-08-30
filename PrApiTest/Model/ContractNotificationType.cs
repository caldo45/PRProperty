using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Model
{
    [Table("contract_notification_type")]
    public class ContractNotificationType
    {

            [Column("contract_notification_type_id")]
            public int Id { get; set; }

            [Column("contract_notification_type")]
            public string NotificationType { get; set; }
        }
}
