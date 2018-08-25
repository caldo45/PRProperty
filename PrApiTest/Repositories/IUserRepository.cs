using PrApiTest.Model;
using PrApiTest.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrApiTest.Repositories
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

        IEnumerable<Client> GetUserByType(int id);

        //IEnumerable<Client> GetUserByType(int clientTypeId);

        IEnumerable<Property> GetByLandlordId(int id);
        Client AddUserImage(int id, string path);

        //Client GetLandlordByProperty(int propertyId);

        IEnumerable<Room> GetRooms();
        Room GetRoom(int id);
        Room AddRoom(Room room);
        IEnumerable<Room> GetRoomsByProperty(int propertyId);

        IEnumerable<Contract> GetContracts();
        Contract GetContract(int id);
        Contract AddContract(Contract contract);
        Contract GetActiveContract(int roomId);
        IEnumerable<Contract> GetActiveContracts(int propertyId);
        Contract GetActiveContractByClient(int tenantId);

        IEnumerable<Lease> GetLeases();
        Lease GetLease(int id);
        Lease AddLease(Lease lease);

        IEnumerable<PaymentType> GetPaymentTypes();
        PaymentType GetPaymentType(int id);
        PaymentType AddPaymentType(PaymentType paymentType);

        IEnumerable<Payment> GetPayments();
        Payment GetPayment(int id);
        Payment AddPayment(Payment payment);

        IEnumerable<LeaseNotification> GetLeaseNotifications();
        LeaseNotification GetLeaseNotification(int id);
        LeaseNotification AddLeaseNotification(LeaseNotification leaseNotification);

        IEnumerable<ContractNotification> GetContractNotifications();
        ContractNotification GetContractNotification(int id);
        ContractNotification AddContractNotification(ContractNotification contractNotification);

  


    }
}
