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
        IEnumerable<Contract> GetUpcomingContractsByClient(int clientId);
        IEnumerable<Contract> GetOldContractsByClient(int clientId);
        IEnumerable<Contract> GetAllOldContracts();
        IEnumerable<Contract> GetOldContractsByRoom(int roomId);
        IEnumerable<Contract> GetUpcomingContractsByRoom(int roomId);
        IEnumerable<RoomImage> GetImageForEachRoomInProperty(int propertyId);
        IEnumerable<PropertyImage> GetImageForEachProperty();
        Contract UpdateContract(Contract contract);

        Client UpdateUser(Client user);
        Property UpdateProperty(Property property);

        IEnumerable<Client> GetUserByType(int id);

        IEnumerable<Property> GetByLandlordId(int id);
        Client AddUserImage(int id, string path);

        IEnumerable<Room> GetRooms();
        Room GetRoom(int id);
        Room AddRoom(Room room);
        IEnumerable<Room> GetRoomsByProperty(int propertyId);
        IEnumerable<PropertyImage> GetAllPropertiesImages();
        ContractNotification MarkAsRead(ContractNotification contractNotification);
        IEnumerable<Contract> GetAllActiveContracts();
        IEnumerable<Contract> GetAllUpcomingContracts();

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
        string DeletePropertyImage(PropertyImage image, string fileName);
        string DeleteRoomImage(RoomImage image, string fileName);
        RoomImage GetRoomImage(int imageId);
        IEnumerable<Lease> GetUpcomingLeasesByProperty(int propertyId);
        IEnumerable<Lease> GetOldLeasesByProperty(int propertyId);
        PropertyImage GetPropertyImage(int imageId);
        Lease UpdateLease(Lease lease);


    }
}
