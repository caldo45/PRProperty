using PrApi.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PrApi.Model;

namespace PrApi.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<Client> GetUsers();
        Client GetUser(int id);
        IEnumerable<Property> GetProperties();
        Property GetProperty(int id);
        Client AddUser(Client user);
        Property AddProperty(Property property);
        IEnumerable<ClientType> GetClientTypes();
        IEnumerable<NextOfKin> GetNextOfKins();
        NextOfKin GetNextOfKin(int id);
        NextOfKin AddNextOfKin(NextOfKin nextOfKin);
        Client DeleteClient(Client client);

        Client UpdateUser(Client user);
        Property UpdateProperty(Property property);

        IEnumerable<Client> GetUserByType(int id);

        //IEnumerable<Client> GetUserByType(int clientTypeId);

        IEnumerable<Property> GetByLandlordId(int id);
        Client AddUserImage(int id, string path);

        //Client GetLandlordByProperty(int propertyId);

        IEnumerable<Room> GetRooms();
        Room GetRoom(int id);
        Room AddRoom(Room room);
        IEnumerable<Room> GetRoomsByProperty(int propertyId);
        IEnumerable<PropertyImage> GetAllPropertiesImages();
        ContractNotification MarkAsRead(ContractNotification contractNotification);
        IEnumerable<Contract> GetAllActiveContracts();
        IEnumerable<Contract> GetAllInactiveContracts();

        IEnumerable<Contract> GetContracts();
        Contract GetContract(int id);
        Contract AddContract(Contract contract);
        Contract GetActiveContract(int roomId);
        IEnumerable<Contract> GetActiveContracts(int propertyId);
        Contract GetActiveContractByClient(int tenantId);
        RoomImage AddRoomImage(int assetIdInt, string apiPath);
        IEnumerable<RoomImage> GetRoomImages(int roomId);
        IEnumerable<Lease> GetLeases();
        Lease GetLease(int id);
        Lease AddLease(Lease lease);
        IEnumerable<PropertyImage> GetPropertyImages(int propertyId);
        PropertyImage AddPropertyImage(int assetIdInt, string apiPath);

        IEnumerable<PaymentType> GetPaymentTypes();
        PaymentType GetPaymentType(int id);
        PaymentType AddPaymentType(PaymentType paymentType);

        IEnumerable<Payment> GetPayments();
        Payment GetPayment(int id);
        Payment AddPayment(Payment payment);

        List<String> CheckValidPayments(Payment[] payments);
        IEnumerable<Payment> GetPaymentsByUser(int userId);

        IEnumerable<Contract> AddContractNotifications(int days);


        IEnumerable<LeaseNotification> GetLeaseNotifications();
        LeaseNotification GetLeaseNotification(int id);
        LeaseNotification AddLeaseNotification(LeaseNotification leaseNotification);

        IEnumerable<ContractNotification> GetContractNotifications();
        ContractNotification GetContractNotification(int id);
        ContractNotification AddContractNotification(ContractNotification contractNotification);

        Contract GetContractByPaymentReference(string paymentReference);
        IEnumerable<Lease> GetLeasesByProperty(int propertyId);
        Lease GetActiveLeaseByProperty(int propertyId);
        IEnumerable<Lease> GetActiveLeases();
        string DeletePropertyImage(PropertyImage image);





    }
}
