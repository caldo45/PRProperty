using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PrApiTest.Database;
using PrApiTest.Model;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;
using PrApiTest.Extensions;
using System.Net;
using System.Net.Http;

namespace PrApiTest.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _db;

        public UserRepository(UserDbContext db)
        {
            _db = db;
        }

        public IEnumerable<Property> GetProperties()
        {
            var properties = _db.Properties
                .Include(c => c.Landlord);
            return properties;
        }

        public IEnumerable<Property> GetByLandlordId(int landlordId)
        {
            var properties = _db.Properties.Where(b => b.LandlordId == landlordId);
            return properties;
        }



        public Property GetProperty(int id)
        {
            var property = _db.Properties.Include(c => c.Landlord).FirstOrDefault(b => b.Id == id);
            return property;
        }

        public Client GetUser(int id)
        {
            var user = _db.Users.FirstOrDefault(b => b.Id == id);
            return user;
        }

        public Client AddUserImage(int id, string path)
        {
            var user = _db.Users.FirstOrDefault(b => b.Id == id);
            if (user != null)
            {
                user.ImagePath = path;
                _db.SaveChanges();
                return user;
            }
            return user;
        }

        public IEnumerable<Client> GetUsers()
        {
            var users = _db.Users
                .Include(c => c.ClientType);
            return users;
        }

        public IEnumerable<Client> GetUserByType(int clientTypeId)
        {
            var users = _db.Users
                .Where(c => c.ClientTypeId == clientTypeId );
            return users;
        }

        public Client AddUser(Client user)
        {
            _db.Users.Add(user);
            _db.SaveChanges();
            return user;
        }

        public Property AddProperty(Property property)
        {
            _db.Properties.Add(property);
            _db.SaveChanges();
            return property;
        }

        public IEnumerable<ClientType> GetClientTypes()
        {
            var clientTypes = _db.ClientTypes;
            return clientTypes;

        }

        public IEnumerable<NextOfKin> GetNextOfKins()
        {
            var nextOfKins = _db.NextOfKins
                .Include(c => c.Client); 
            return nextOfKins;
        }

        public NextOfKin GetNextOfKin(int id)
        {
            var nextOfKin = _db.NextOfKins.FirstOrDefault(b => b.Id == id);
            return nextOfKin;
        }

        public NextOfKin AddNextOfKin(NextOfKin nextOfKin)
        {
            _db.NextOfKins.Add(nextOfKin);
            _db.SaveChanges();
            return nextOfKin;
        }

        public IEnumerable<Room> GetRooms()
        {
            var rooms = _db.Rooms
                .Include(p => p.Property);
            return rooms;
        }

        public Room GetRoom(int id)
        {
            var room = _db.Rooms.FirstOrDefault(b => b.Id == id);
            return room;
        }

        public IEnumerable<Room> GetRoomsByProperty(int propertyId)
        {
            var rooms = _db.Rooms.Where(b => b.PropertyId == propertyId);
            return rooms;
        }

        public Room AddRoom(Room room)
        {
            _db.Rooms.Add(room);
            _db.SaveChanges();
            return room;
        }

        
        public IEnumerable<Contract> GetContracts()
        {
            var contracts = _db.Contracts
               .Include(r => r.Room)
               .Include(u => u.Client)
              .Include(p => p.PaymentType)
              .Include(r => r.Room.Property);

            return contracts;
        }

        public Contract GetContract(int id)
        {
            var contract = _db.Contracts.FirstOrDefault(b => b.Id == id);
            return contract; 
        }

        public Contract GetActiveContract(int roomId)
        {
            DateTime date = DateTime.Now;
            var contract = _db.Contracts.Include(r => r.Room)
               .Include(u => u.Client)
              .Include(p => p.PaymentType).FirstOrDefault(r => r.RoomId == roomId
                                                   && (r.DateFrom.CompareTo(date) <= 0)
                                                     && (r.DateTo.CompareTo(date) >= 0)) ;
            return contract;
        }

        public Contract GetActiveContractByClient(int tenantId)
        {
            DateTime date = DateTime.Now;
            var contract = _db.Contracts.Include(r => r.Room)
               .Include(u => u.Client)
              .Include(p => p.PaymentType).FirstOrDefault(r => r.ClientId == tenantId
                                                   && (r.DateFrom.CompareTo(date) <= 0)
                                                     && (r.DateTo.CompareTo(date) >= 0));
            return contract;
        }

        public IEnumerable<Contract> GetActiveContracts(int propertyId)
          {
              DateTime date = DateTime.Now;
              var contract = _db.Contracts.Include(r => r.Room)
                 .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(c => c.Room.Property).Where(r => r.Room.PropertyId == propertyId
                                                     && (r.DateFrom.CompareTo(date) <= 0)
                                                       && (r.DateTo.CompareTo(date) >= 0));
              return contract;
          }

        /*  public IEnumerable<Contract> GetActiveContracts(Room[] rooms)
          {
              DateTime date = DateTime.Now;
              List<Contract> activeContracts = new List<Contract>();
              foreach (Room room in rooms)
              {
                  activeContracts.Add
                    (_db.Contracts.Where(r => r.RoomId == room.Id
                      && (r.DateFrom.CompareTo(date) <= 0)
                      && (r.DateTo.CompareTo(date) >= 0)))
                 ;
                  return activeContracts;
              }
          }*/

        public Contract AddContract(Contract contract)
        {
            DateTime date = DateTime.Now;
           var overlapExists = _db.Contracts.Any(c => c.RoomId == contract.RoomId
                                          && c.Overlaps(contract));
            if (!overlapExists)
            {
                _db.Contracts.Add(contract);
                _db.SaveChanges();
                return contract;
            }
            else
            {
               // throw new HttpResponseException("Contract Cannot Overlap With Another for Same Room", HttpStatusCode.BadRequest);
            }
            return null;

        }

        public IEnumerable<Lease> GetLeases()
        {
            var leases = _db.Leases
                .Include(p => p.Property);
            return leases;
        }

        public Lease GetLease(int id)
        {
            var lease = _db.Leases.FirstOrDefault(b => b.Id == id);
            return lease;
        }

        public Lease AddLease(Lease lease)
        {
            _db.Leases.Add(lease);
            _db.SaveChanges();
            return lease;
        }

        public IEnumerable<PaymentType> GetPaymentTypes()
        {
            var paymentTypes = _db.PaymentTypes;
            return paymentTypes;
        }

        public PaymentType GetPaymentType(int id)
        {
            var paymentType = _db.PaymentTypes.FirstOrDefault(b => b.Id == id);
            return paymentType;
        }

        public PaymentType AddPaymentType(PaymentType paymentType)
        {
            _db.PaymentTypes.Add(paymentType);
            _db.SaveChanges();
            return paymentType;
        }

        public IEnumerable<Payment> GetPayments()
        {
            var payments = _db.Payments;
            return payments;
        }

        public Payment GetPayment(int id)
        {
            var payment = _db.Payments.FirstOrDefault(b => b.Id == id);
            return payment;
        }

        public Payment AddPayment(Payment payment)
        {
            _db.Payments.Add(payment);
            _db.SaveChanges();
            return payment;
        }

        public IEnumerable<LeaseNotification> GetLeaseNotifications()
        {
            var leaseNotifications = _db.LeaseNotifications;
            return leaseNotifications;
        }

        public LeaseNotification GetLeaseNotification(int id)
        {
            var leaseNotification = _db.LeaseNotifications.FirstOrDefault(b => b.Id == id);
            return leaseNotification;
        }

        public LeaseNotification AddLeaseNotification(LeaseNotification leaseNotification)
        {
            _db.LeaseNotifications.Add(leaseNotification);
            _db.SaveChanges();
            return leaseNotification;
        }

        public IEnumerable<ContractNotification> GetContractNotifications()
        {
            var contractNotifications = _db.ContractNotifications;
            return contractNotifications;
        }

        public ContractNotification GetContractNotification(int id)
        {
            var contractNotification = _db.ContractNotifications.FirstOrDefault(b => b.Id == id);
            return contractNotification;
        }

        public ContractNotification AddContractNotification(ContractNotification contractNotification)
        {
            _db.ContractNotifications.Add(contractNotification);
            _db.SaveChanges();
            return contractNotification;
        }
    }
}
