using Microsoft.EntityFrameworkCore;
using PrApiTest.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySqlX.XDevAPI.Relational;

namespace PrApiTest.Database
{
    public class UserDbContext : DbContext
    {
        public DbSet<Client> Users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<ClientType> ClientTypes { get; set; }
        public DbSet<NextOfKin> NextOfKins { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Lease> Leases { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<LeaseNotification> LeaseNotifications { get; set; }
        public DbSet<ContractNotification> ContractNotifications { get; set; }
        public DbSet<RoomImage> RoomImages { get; set; }
        public DbSet<PropertyImage> PropertyImages { get; set; }
        public DbSet<Lease> Lease { get; set; }

        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }
    }
}
