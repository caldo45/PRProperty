using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PrApiTest.Model;
using PrApiTest.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PrApiTest.Repositories;

namespace PrApiTest.Controllers
{
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


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var contracts = _repository.GetContract(id);
            return Ok(contracts);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Contract contract)
        {
            var added = _repository.AddContract(contract);

            if (added.Id == 0)
            {
                return StatusCode(400, "Contract exists or overlaps");
            }

            return StatusCode(201, added);
        }

        [HttpPost("payments")]
        public IActionResult Post([FromBody]Payment[] payments)
        {
            List<String> badReferences = new List<string>(_repository.CheckValidPayments(payments));
            if (badReferences.Count >= 1)
            {
                return Json(badReferences);
            }
            foreach (Payment payment in payments)
                {
                    var contract = _repository.GetContractByPaymentReference(payment.Reference);
                        payment.ContractId = contract.Id;
                        var added = _repository.AddPayment(payment);  
                    }
                return Json(201);
            }
        } 
   }
    

