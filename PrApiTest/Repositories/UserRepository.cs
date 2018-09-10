using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;
using PrApi.Extensions;
using System.Net;
using System.Net.Http;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using PrApi.Database;
using PrApi.Model;
using Remotion.Linq.Clauses;

namespace PrApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _db;

        public UserRepository(UserDbContext db)
        {
            _db = db;
        }

        //Return All Properties
        public IEnumerable<Property> GetProperties()
        {
            var properties = _db.Properties
                 //Include the Client Object Subclass
                .Include(c => c.Landlord);
            return properties;
        }

        //Return Properties
        public IEnumerable<Property> GetByLandlordId(int landlordId)
        {
            //Dependant on the LandlordId passed
            var properties = _db.Properties.Where(b => b.LandlordId == landlordId);
            return properties;
        }

        //Get Specific Property 
        public Property GetProperty(int id)
        {
            //Including Client object, where equals passed Property ID
            var property = _db.Properties.Include(c => c.Landlord).FirstOrDefault(b => b.Id == id);
            return property;
        }

        //Get Specific Property Image
        public IEnumerable<PropertyImage> GetPropertyImages(int propertyId)
        {
            //Including Property Subclass
            var propertyImages = _db.PropertyImages.Include(p => p.Property).Where(p => p.PropertyId == propertyId);
            return propertyImages;
        }

        public IEnumerable<PropertyImage> GetAllPropertiesImages()
        {
            var propertyImage = _db.PropertyImages;
            return propertyImage;
        }


        public Client GetUser(int id)
        {
            var user = _db.Users.FirstOrDefault(b => b.Id == id);
            return user;
        }

        public string DeletePropertyImage(PropertyImage image, string fileName)
        {
            if (System.IO.File.Exists(fileName))
            {
                System.IO.File.Delete(fileName);
            }

            _db.PropertyImages.Remove(image);
            _db.SaveChanges();
            return "File Deleted";
            
        }

        public string DeleteRoomImage(RoomImage image, string fileName)
        {
            if (System.IO.File.Exists(fileName))
            {
                System.IO.File.Delete(fileName);
            }

            _db.RoomImages.Remove(image);
            _db.SaveChanges();
            return "File Deleted";

        }

        public PropertyImage GetPropertyImage(int imageId)
        {
            var image = _db.PropertyImages.FirstOrDefault(i => i.Id == imageId);
            return image;
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

        public Client UpdateUser(Client user)
        {

            _db.Entry(user).State = EntityState.Modified;
            _db.SaveChanges();
            return user;
        }

        public Property AddProperty(Property property)
        {
            _db.Properties.Add(property);
            _db.SaveChanges();
            return property;
        }

        public Property UpdateProperty(Property property)
        {
            _db.Entry(property).State = EntityState.Modified;
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

        public NextOfKin GetNextOfKin(int clientId)
        {
            var nextOfKin = _db.NextOfKins.Include(n => n.Client).FirstOrDefault(b => b.ClientId == clientId);
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
            var room = _db.Rooms.Include(r => r.Property)
                    .FirstOrDefault(b => b.Id == id);
            return room;
        }

        public IEnumerable<RoomImage> GetRoomImages(int roomId)
        {
            var roomImages = _db.RoomImages.Include(r => r.Room)
                                    .Where(r => r.RoomId == roomId);
            return roomImages;
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

        public RoomImage AddRoomImage(int roomId, string path)
        {
            RoomImage roomImage = new RoomImage();
            roomImage.RoomId = roomId;
            roomImage.ImagePath = path;
            _db.RoomImages.Add(roomImage);
            _db.SaveChanges();
            return roomImage;
        }

        public PropertyImage AddPropertyImage(int propertyId, string path)
        {
            PropertyImage propertyImage = new PropertyImage();
            propertyImage.PropertyId = propertyId;
            propertyImage.ImagePath = path;
            _db.PropertyImages.Add(propertyImage);
            _db.SaveChanges();
            return propertyImage;
        }

        public Contract GetContractByPaymentReference(string paymentReference)
        {
            var contract = _db.Contracts.Include(r => r.Client)
                .FirstOrDefault(r => r.PaymentReference == paymentReference);
            return contract;
        }

        public Payment[] AddPayments(Payment[] payments)
        {
            Payment[] paymentsArray = payments;

            _db.Add(payments);
            _db.SaveChanges();
            return paymentsArray;
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
            var contract = _db.Contracts
                .Include(r => r.Room)
                .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(r => r.Room.Property).
                FirstOrDefault(b => b.Id == id);
            return contract; 
        }

        // Returns Active Contract for a Room if Exists
        public Contract GetActiveContract(int roomId)
        {
            //Get current time
            DateTime date = DateTime.Now;
            //Include 
            var contract = _db.Contracts.Include(r => r.Room)
                                        .Include(r => r.Room.Property)
                                        .Include(u => u.Client)
                                        .Include(p => p.PaymentType).FirstOrDefault(r => r.RoomId == roomId
                                                                      && (r.DateFrom.CompareTo(date) <= 0)
                                                                      && (r.DateTo.CompareTo(date) >= 0));
            return contract;
        }

        public IEnumerable<Contract> GetOldContractsByRoom(int roomId)
        {
            DateTime date = DateTime.Now;
            var contracts = _db.Contracts.Include(r => r.Room)
                .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(c => c.Room.Property).Where(r => r.DateTo.CompareTo(date) < 0 && r.DateFrom.CompareTo(date) < 0 && r.RoomId == roomId);
            return contracts;
        }

        public IEnumerable<Contract> GetUpcomingContractsByRoom(int roomId)
        {
            DateTime date = DateTime.Now;
            var contracts = _db.Contracts.Include(r => r.Room)
                .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(c => c.Room.Property).Where(r => r.DateTo.CompareTo(date) > 0 && r.DateFrom.CompareTo(date) > 0 && r.RoomId == roomId);
            return contracts;
        }

        public IEnumerable<Lease> GetUpcomingLeasesByProperty(int propertyId)
        {
            DateTime date = DateTime.Now;
            var leases = _db.Leases.Where(l => l.DateTo.CompareTo(date) > 0 && l.DateFrom.CompareTo(date) > 0);
            return leases;
        }

        public IEnumerable<Lease> GetOldLeasesByProperty(int propertyId)
        {
            DateTime date = DateTime.Now;
            var leases = _db.Leases.Where(l => l.DateTo.CompareTo(date) < 0 && l.DateFrom.CompareTo(date) < 0);
            return leases;
        }

        

        public IEnumerable<PropertyImage> GetImageForEachProperty()
        {
            var properties = _db.Properties;
            List<PropertyImage> images = new List<PropertyImage>();
            foreach (Property property in properties)
            {
                var image = _db.PropertyImages.FirstOrDefault(pi => pi.PropertyId == property.Id);
                if (image != null)
                {
                    images.Add(image);
                }
                
            }

            return images;
        }

        public IEnumerable<RoomImage> GetImageForEachRoomInProperty(int propertyId)
        {
            var rooms = _db.Rooms.Where(r => r.PropertyId == propertyId);
            List<RoomImage> images = new List<RoomImage>();
            foreach (Room room in rooms)
            {
                var image = _db.RoomImages.FirstOrDefault(ri => ri.RoomId == room.Id);
                if (image != null)
                {
                    images.Add(image);
                }               
            }
            return images;
        }

        public RoomImage GetRoomImage(int imageId)
        {
            var image = _db.RoomImages.FirstOrDefault(r => r.Id == imageId);
            return image;
        }

        public Lease GetActiveLeaseByProperty(int propertyId)
        {
            DateTime date = DateTime.Now;
            var lease = _db.Lease.Include(l => l.Property)
                .FirstOrDefault(r => r.PropertyId == propertyId
                                     && (r.DateFrom.CompareTo(date) <= 0)
                                     && (r.DateTo.CompareTo(date) >= 0));
            return lease;
        }

        public IEnumerable<Lease> GetLeasesByProperty(int propertyId)
        {
            var leases = _db.Lease.Include(l => l.Property)
                .Where(r => r.PropertyId == propertyId);
            return leases;
        }

        public IEnumerable<Lease> GetActiveLeases()
        {
            DateTime date = DateTime.Now;
            var leases = _db.Lease.Include(l => l.Property).Where(l => l.DateFrom.CompareTo(date) <= 0 && l.DateTo.CompareTo(date) >= 0);
            return leases;
        }



        public Contract GetActiveContractByClient(int tenantId)
        {
            DateTime date = DateTime.Now;
            var contract = _db.Contracts.Include(r => r.Room)
                                        .Include(c => c.Room.Property)
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

        public IEnumerable<Contract> GetAllActiveContracts()
        {
            DateTime date = DateTime.Now;
            var contract = _db.Contracts.Include(r => r.Room)
                .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(c => c.Room.Property).Where(r => r.DateFrom.CompareTo(date) <= 0
                                                          && r.DateTo.CompareTo(date) >= 0);
            return contract;

        }

        public IEnumerable<Contract> GetAllUpcomingContracts()
        {
            DateTime date = DateTime.Now;
            var contracts = _db.Contracts.Include(r => r.Room)
                .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(c => c.Room.Property).Where(r => r.DateTo.CompareTo(date) > 0 && r.DateFrom.CompareTo(date) > 0);
            return contracts;
        }

        public IEnumerable<Contract> GetAllOldContracts()
        {
            DateTime date = DateTime.Now;
            var contracts = _db.Contracts.Include(r => r.Room)
                .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(c => c.Room.Property).Where(r => r.DateTo.CompareTo(date) < 0 && r.DateFrom.CompareTo(date) < 0);
            return contracts;
        }


        public Contract AddContract(Contract contract)
        {
           var overlapRoomExists = _db.Contracts.Any(c => c.RoomId == contract.RoomId
                                          && c.Overlaps(contract));
            var overlapTenantExists = _db.Contracts.Any(c => c.ClientId == contract.ClientId
                                                             && c.Overlaps(contract));
            bool leaseValid = CheckContractValidWithLease(contract);
            
            if (!overlapRoomExists && !overlapTenantExists && leaseValid)
            {
                _db.Contracts.Add(contract);
                _db.SaveChanges();
                return contract;
            }

            return contract;

        }

        public bool CheckContractValidWithLease(Contract contract)
        {
            bool leaseValid;
            var room = _db.Rooms.FirstOrDefault(r => r.Id == contract.RoomId);
            var leases = _db.Leases.Where(l => l.PropertyId == room.PropertyId);
            foreach (Lease lease in leases)
            {
                if (lease.DateFrom.CompareTo(contract.DateFrom) <= 0 && lease.DateTo.CompareTo(contract.DateTo) >= 0)
                {
                    leaseValid = true;
                    return leaseValid;
                }
            }

            leaseValid = false;
            return leaseValid;
        }

        public IEnumerable<Contract> GetUpcomingContractsByClient(int clientId)
        {
            DateTime date = DateTime.Now;
            var contracts = _db.Contracts.Include(r => r.Room)
                .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(c => c.Room.Property).Where(r => r.ClientId == clientId && r.DateTo.CompareTo(date) >= 0 && r.DateFrom.CompareTo(date) >= 0);
            return contracts;
        }

        public IEnumerable<Contract> GetOldContractsByClient(int clientId)
        {
            DateTime date = DateTime.Now;
            var contracts = _db.Contracts.Include(r => r.Room)
                .Include(u => u.Client)
                .Include(p => p.PaymentType)
                .Include(c => c.Room.Property).Where(r => r.ClientId == clientId && r.DateTo.CompareTo(date) <= 0 && r.DateFrom.CompareTo(date) <= 0);
            return contracts;
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
            var overlapPropertyExists = _db.Lease.Any(l => l.PropertyId == lease.PropertyId
                                                           && l.Overlaps(lease) && l.Id != lease.Id);
            if (!overlapPropertyExists)
            {
                _db.Leases.Add(lease);
                _db.SaveChanges();
                return lease;
            }
            else
            {
                throw new HttpRequestException("Lease Overlaps With Another for this Property, Please Amend Dates");
            }

        }

        public Lease UpdateLease(Lease lease)
        {
            var overlapPropertyExists = _db.Lease.Any(l => l.PropertyId == lease.PropertyId
                                                           && l.Overlaps(lease) && l.Id != lease.Id);
            if (!overlapPropertyExists)
            {
                _db.Entry(lease).State = EntityState.Modified;
                _db.SaveChanges();
                return lease;
            }
            else
            {
                throw new HttpRequestException("New Lease Overlaps With Another for this Property, Please Amend Dates");
            }
        }

        public Contract UpdateContract(Contract contract)
        {
            var overlapRoomExists = _db.Contracts.Any(c => c.RoomId == contract.RoomId
                                                           && c.Overlaps(contract) && c.Id != contract.Id);
            var overlapTenantExists = _db.Contracts.Any(c => c.ClientId == contract.ClientId
                                                             && c.Overlaps(contract) && c.Id != contract.Id);
            bool leaseValid = CheckContractValidWithLease(contract);

            if (!overlapRoomExists && !overlapTenantExists && leaseValid)
            {
                _db.Entry(contract).State = EntityState.Modified;
                _db.SaveChanges();
                return contract;
            }

            {
                contract.Id = 0;
                return contract;
            }

        }

        public Client DeleteClient(Client client)
        {
            //Checks if Client has any Contracts
            var contract = _db.Contracts.FirstOrDefault(c => c.ClientId == client.Id);
            //Checks if Client has an Active Contract
            var activeContracts = GetActiveContractByClient(client.Id);
            //Checks if Client is Landlord to any Properties
            var property = _db.Properties.FirstOrDefault(p => p.LandlordId == client.Id);
            //if no contract history or properties owned
            if (contract == null && property == null)
            {
                //remove Client from DB
                _db.Users.Remove(client);
                _db.SaveChanges();
                client.Id = 0;
                return client;
            }
            //if Client has a any previous contracts, remove their personal information from the DB.
            if (activeContracts == null)
            {
                client.Email = "";
                client.FirstName = "Client Details Removed";
                client.LastName = "";
                client.Dob = DateTime.Now;
                client.Phone = "";
                client.ImagePath = "default/defaultImage.jpg";
                _db.Entry(client).State = EntityState.Modified;
                _db.SaveChanges();
                return client;
            }
            {
                //else return the client unmodified
                return client;
            }
        }

        public Lease DeleteLease(Lease lease)
        {
            DateTime date = DateTime.Now;
            if (lease.DateTo.CompareTo(date) <= 0 && lease.DateFrom.CompareTo(date) <= 0)
            {
                var contract = _db.Contracts.Include(c=> c.Room).FirstOrDefault(c =>
                    c.DateFrom.CompareTo(lease.DateFrom) >= 0 && c.DateTo.CompareTo(lease.DateTo) <= 0 && c.Room.PropertyId == lease.PropertyId);
                if (contract == null)
                {
                    _db.Lease.Remove(lease);
                    _db.SaveChanges();
                    lease.Id = 0;
                    return lease;
                }
                             
            }
            return lease;
        }

        public Contract DeleteContract(Contract contract)
        {
            DateTime date = DateTime.Now;
            if (contract.DateFrom.CompareTo(date) >= 0 && contract.DateTo.CompareTo(date) >= 0)
            {
                _db.Contracts.Remove(contract);
                _db.SaveChanges();
                contract.Id = 0;
                return contract;
            }

            return contract;
        }

        //delete Property
        public Property DeleteProperty(Property property)
        {
            //checks to see if Property has any Leases associated to it
            var leases = _db.Leases.FirstOrDefault(l => l.PropertyId == property.Id);
            if (leases == null)
            {
                //checks to see if any Contracts are associated to Property
                var contract = _db.Contracts.Include(c => c.Room).FirstOrDefault(c => c.Room.PropertyId == property.Id);
                if (contract == null)
                {
                    //if not collect images and rooms associated and remove all
                    var images = _db.PropertyImages.Where(pi => pi.PropertyId == property.Id);
                    var rooms = _db.Rooms.Where(r => r.PropertyId == property.Id);
                    var roomImages =  _db.RoomImages.Include(r => r.Room).Where(r => r.Room.PropertyId == property.Id);
                    foreach (RoomImage image in roomImages)
                    {
                        _db.RoomImages.Remove(image);
                    }
                    foreach (Room room in rooms)
                    {
                        _db.Rooms.Remove(room);
                    }

                    foreach (PropertyImage image in images)
                    {
                        _db.PropertyImages.Remove(image);
                    }
                    //remove Property
                    _db.Properties.Remove(property);
                    _db.SaveChanges();
                    property.Id = 0;
                    return property;
                }
           
            }

            return property;
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

        public IEnumerable<Payment> GetPaymentsByUser(int userId)
        {
            var payments = _db.Payments.Include(p => p.Contract)
                                         .Include(p => p.Contract.Room)
                                        .Include(p => p.Contract.Client)
                                        
                                        .Include(p => p.Contract.Room.Property)
                .Where(b => b.Contract.ClientId == userId);
            return payments;
        }

        public Payment GetPayment(int id)
        {
            var payment = _db.Payments.Include(p => p.Contract)
                .Include(p => p.Contract.Client)
                .Include(p => p.Contract.Room)
                .Include(p => p.Contract.Room.Property)
                .FirstOrDefault(b => b.Contract.ClientId == id);
            return payment;
        }

        public IEnumerable<Payment> GetPayments()
        {
            var payments = _db.Payments.Include(p => p.Contract)
                .Include(p => p.Contract.Client)
                .Include(p => p.Contract.Room)
                .Include(p => p.Contract.Room.Property);
            return payments;

        }

        public Payment AddPayment(Payment payment)
        {
            _db.Payments.Add(payment);
            _db.SaveChanges();
            return payment;
        }

        public List<String> CheckValidPayments(Payment[] payments)
        {
            List<String> badReferences = new List<String>();
            foreach (Payment payment in payments)
            {
                var contract = _db.Contracts.FirstOrDefault(c => c.PaymentReference == payment.Reference);
                if (contract == null)
                {
                    badReferences.Add(payment.Reference);
                }
            }

            return badReferences;
            
        }

        //Add Contract Notifications to DB
        public IEnumerable<Contract> AddContractNotifications(int days)
        {
            //Gets todays date, and adds on number of days dependant on Notification
            DateTime date = DateTime.Now.AddDays(+days);
            int exists = 0;
            var contracts = _db.Contracts.Where(c => c.DateTo <= date);
            //returns all notifications
            var existingNotifications = _db.ContractNotifications;
            foreach (Contract contract in contracts)
            {
                ContractNotification notification = new ContractNotification();
                notification.ContractId = contract.Id;
                //Perfroms a Switch on Days, for the different Notification Lengths & Assigns type based on these
                switch (days)
                {
                    case 30:
                        notification.ContractNotificationTypeId = 1;
                        break;
                    case 60:
                        notification.ContractNotificationTypeId = 2;
                        break;
                    case 90:
                        notification.ContractNotificationTypeId = 3;
                        break;
                }

                //Performs check to ensure that no Notification of that type exists for that Contract
                foreach (ContractNotification existingNotification in existingNotifications)
                {
                    if (notification.ContractId == existingNotification.ContractId &&
                        notification.ContractNotificationTypeId == existingNotification.ContractNotificationTypeId)
                    {
                        exists = 1;
                    }
                }
                //if not, add to Db
                if (exists == 0)
                {
                    notification.DateAdded = DateTime.Now;
                    _db.ContractNotifications.Add(notification);
                }
            }
            _db.SaveChanges();
            return contracts;
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
            var contractNotifications = _db.ContractNotifications
                .Include(n => n.Contract).Include(n => n.Contract.Client).Include(n => n.ContractNotificationType);
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

        public ContractNotification MarkAsRead(ContractNotification contractNotification)
        {

            _db.Entry(contractNotification).State = EntityState.Modified;
            _db.SaveChanges();
            return contractNotification;
        }

    }
}
