using PrApiTest.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Extensions
{
    public static class ContractExtensions
    {
        public static bool Overlaps(this Contract contract, Contract otherContract)
        {
            var overlaps = contract.DateFrom.CompareTo(otherContract.DateTo) < 0 && contract.DateTo.CompareTo(otherContract.DateFrom) > 0;
            return overlaps;
        }
    }
}
