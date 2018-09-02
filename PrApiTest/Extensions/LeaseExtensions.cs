using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PrApi.Model;

namespace PrApi.Extensions
{
    public static class LeaseExtensions
    {

        public static bool Overlaps(this Lease lease, Lease otherLease)
        {
            var overlaps = lease.DateFrom.CompareTo(otherLease.DateTo) < 0 && lease.DateTo.CompareTo(otherLease.DateFrom) > 0;
            return overlaps;
        }
    }
}
