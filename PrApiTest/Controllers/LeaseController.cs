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

        [HttpPost]
        public IActionResult Post(Lease lease)
        {
            var added = _repository.AddLease(lease);
            return StatusCode(201, added);
        }

    }
}

