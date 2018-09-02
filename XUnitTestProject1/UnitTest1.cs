using PrApi.Extensions;
using PrApi.Model;
using System;
using Xunit;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        [Fact]
        public void OverlapTest1()
        {


            var contractCase1 = new Contract
            {
                DateFrom = new DateTime(2000, 1, 1),
                DateTo = new DateTime(2001, 1, 1)
            };

            var overlapContractCase1 = new Contract
            {
                DateFrom = new DateTime(2000, 10, 1),
                DateTo = new DateTime(2002, 1, 1)
            };

            Assert.True(contractCase1.Overlaps(overlapContractCase1));

        }

        [Fact]
        public void OverlapTest2() {

            var contractCase2 = new Contract
            {
                DateFrom = new DateTime(2000, 1, 1),
                DateTo = new DateTime(2001, 1, 1)
            };

            var overlapContractCase2 = new Contract
            {
                DateFrom = new DateTime(1999, 1, 1),
                DateTo = new DateTime(2001, 5, 1)
            };

            Assert.True(contractCase2.Overlaps(overlapContractCase2));
        }

        [Fact]
        public void OverlapTest3()
        {

            var contractCase3 = new Contract
            {
                DateFrom = new DateTime(2000, 1, 1),
                DateTo = new DateTime(2001, 1, 1)
            };

            var overlapContractCase3 = new Contract
            {
                DateFrom = new DateTime(2000, 5, 1),
                DateTo = new DateTime(2000, 7, 1)
            };

            Assert.True(contractCase3.Overlaps(overlapContractCase3));

        }

        [Fact]
        public void OverlapTest4()
        {

            var contractCase4 = new Contract
            {
                DateFrom = new DateTime(2000, 1, 1),
                DateTo = new DateTime(2001, 1, 1)
            };

            var overlapContractCase4 = new Contract
            {
                DateFrom = new DateTime(1999, 12, 1),
                DateTo = new DateTime(2001, 10, 1)
            };
            
            Assert.True(contractCase4.Overlaps(overlapContractCase4));

        }

        [Fact]
        public void ValidTest1()
        {

            var contractCase5 = new Contract
            {
                DateFrom = new DateTime(2000, 1, 1),
                DateTo = new DateTime(2001, 1, 1)
            };

            var overlapContractCase5 = new Contract
            {
                DateFrom = new DateTime(1999, 12, 1),
                DateTo = new DateTime(1999, 12, 28)
            };

            Assert.False(contractCase5.Overlaps(overlapContractCase5));

        }

        [Fact]
        public void ValidTest2()
        {

            var contractCase6 = new Contract
            {
                DateFrom = new DateTime(2000, 1, 1),
                DateTo = new DateTime(2001, 1, 1)
            };

            var overlapContractCase6 = new Contract
            {
                DateFrom = new DateTime(2001, 1, 2),
                DateTo = new DateTime(2002, 1, 28)
            };

            Assert.False(contractCase6.Overlaps(overlapContractCase6));

        }
    }
}
