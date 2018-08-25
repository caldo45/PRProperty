using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Model
{
    [Table("lease_notifcations")]
    public class LeaseNotification
    {
        [Column("lease_notificaiton_id")]
        public int Id { get; set; }

        [Column("lease_id")]
        public int LeaseId { get; set; }

        public virtual Lease Lease { get; set; }

        [Column("marked_read")]
        public int MarkedRead { get; set; }

        [Column("lease_notificaiton_type_id")]
        public int LeaseNotificaitonTypeId { get; set; }

       // public virtual LeaseNotificationType {get; set;}

    }
}
