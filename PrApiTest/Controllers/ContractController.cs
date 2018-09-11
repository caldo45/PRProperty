using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using PrApi.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PrApi.Model;
using PrApi.Repositories;

namespace PrApi.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class ContractController : Controller
    {
        private readonly IUserRepository _repository;

        public ContractController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var contracts = _repository.GetContracts();
            return Ok(contracts);

        }

        [HttpGet("activeByRoom{roomId}")]
        public Contract GetActiveContract(int roomId)
        {
            var contract = _repository.GetActiveContract(roomId);
            return contract;
        }

        [HttpGet("upcomingByRoom{roomId}")]
        public IActionResult GetUpcomingContractByRoom(int roomId)
        {
            var contract = _repository.GetUpcomingContractsByRoom(roomId);
            return Ok(contract);
        }

        [HttpGet("oldByRoom{roomId}")]
        public IActionResult GetOldContractsByRoom(int roomId)
        {
            var contract = _repository.GetOldContractsByRoom(roomId);
            return Ok(contract);
        }

        [HttpGet("byPaymentReference{paymentRefernce}")]
        public Contract GetByPaymentReference(string paymentReference)
        {
            var contract = _repository.GetContractByPaymentReference(paymentReference);
            return contract;
        }

        [HttpGet("activeByUser{clientId}")]
        public Contract GetActiveContractByClient(int clientId)
        {
            var contract = _repository.GetActiveContractByClient(clientId);
            return contract;
        }

        [HttpGet("activeByProperty{propertyId}")]
        public IActionResult GetActiveContracts(int propertyId)
        {
            var contracts = _repository.GetActiveContracts(propertyId);
            return Ok(contracts);
        }

        [HttpGet("allActive")]
        public IActionResult GetAllActiveContracts()
        {
            var contracts = _repository.GetAllActiveContracts();
            return Ok(contracts);
        }

        [HttpGet("allUpcoming")]
        public IActionResult GetAllUpcomingContracts()
        {
            var contracts = _repository.GetAllUpcomingContracts();
            return Ok(contracts);
        }

        [HttpGet("allOld")]
        public IActionResult GetAllOldContracts()
        {
            var contracts = _repository.GetAllUpcomingContracts();
            return Ok(contracts);
        }

        [HttpGet("upcomingByClient{clientId}")]
        public IActionResult GetUpComingByUser(int clientId)
        {
            var contracts = _repository.GetUpcomingContractsByClient(clientId);
            return Ok(contracts);
        }

        [HttpGet("oldByClient{clientId}")]
        public IActionResult GetUpOldByUser(int clientId)
        {
            var contracts = _repository.GetOldContractsByClient(clientId);
            return Ok(contracts);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var contracts = _repository.GetContract(id);
            return Ok(contracts);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contract contract)
        {
            if (contract.Id == 0)
            {
                var added = _repository.AddContract(contract);

                if (added.Id == 0)
                {
                    return StatusCode(400, "Contract exists or overlaps");
                }

                return StatusCode(201, added);
            }

            {
                var updated = _repository.UpdateContract(contract);
                if (updated.Id == 0)
                {
                    return StatusCode(400, "Contract exists or overlaps");
                }

                return StatusCode(201, updated);
            }


        }

        [HttpPost("delete")]
        public IActionResult DeleteContract([FromBody] Contract contract)
        {
            var deleted = _repository.DeleteContract(contract);
            if (deleted.Id == 0)
            {
                return StatusCode(202, deleted);
            }

            return StatusCode(400, deleted);
        }

        [HttpPost("payments")]
        public IActionResult Post([FromBody] Payment[] payments)
        {
            //Create List of bad references within the Payments Array
            List<String> badReferences = new List<string>(_repository.CheckValidPayments(payments));
            if (badReferences.Count >= 1)
            {
                //return the bad references
                return Json(badReferences);
            }

            foreach (Payment payment in payments)
            {
                var contract = _repository.GetContractByPaymentReference(payment.Reference);
                payment.ContractId = contract.Id;

                var added = _repository.AddPayment(payment);
            }

            return Json("added");
        }


        [HttpPost("deletePayment")]
        public Payment DeletePayment([FromBody] Payment payment)
        {
            var deleted = _repository.DeletePayment(payment);
            return deleted;
        }
    }
}
    

