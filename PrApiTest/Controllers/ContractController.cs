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
            return StatusCode(201, added);
        }
    }
}
