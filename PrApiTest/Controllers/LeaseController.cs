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
    public class LeaseController : Controller
    {
        private readonly IUserRepository _repository;

        public LeaseController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var leases = _repository.GetLeases();
            return Ok(leases);

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var lease = _repository.GetLease(id);
            return Ok(lease);
        }

        [HttpGet("byProperty/{propertyId}")]
        public IActionResult GetByProperty(int propertyId)
        {
            var leases = _repository.GetLeasesByProperty(propertyId);
            return Ok(leases);
        }

        [HttpGet("activeByProperty{propertyId}")]
        public IActionResult GetActiveByProperty(int propertyId)
        {
            var lease = _repository.GetActiveLeaseByProperty(propertyId);
            return Ok(lease);
        }

        [HttpGet("active")]
        public IActionResult GetActiveLeases()
        {
            var lease = _repository.GetActiveLeases();
            return Ok(lease);
        }


        [HttpPost]
        public IActionResult Post([FromBody]Lease lease)
        {
            var added = _repository.AddLease(lease);
            return StatusCode(201, added);
        }

    }
}

