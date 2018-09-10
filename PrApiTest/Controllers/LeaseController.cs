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

        [HttpGet("upcomingByProperty{propertyId}")]
        public IActionResult GetUpComingLeasesByProperty(int propertyId)
        {
            var leases = _repository.GetUpcomingLeasesByProperty(propertyId);
            return Ok(leases);
        }

        [HttpGet("oldByProperty{propertyId}")]
        public IActionResult GetOldLeasesByProperty(int propertyId)
        {
            var leases = _repository.GetOldLeasesByProperty(propertyId);
            return Ok(leases);
        }

        [HttpGet("active")]
        public IActionResult GetActiveLeases()
        {
            var lease = _repository.GetActiveLeases();
            return Ok(lease);
        }

        [HttpGet("active")]
        public IActionResult DeleteLease(Lease lease)
        {
            var deleted = _repository.DeleteLease(lease);
            return Ok(deleted);
        }


        [HttpPost]
        public IActionResult Post([FromBody] Lease lease)
        {

            if (lease.Id == 0)
            {
                var added = _repository.AddLease(lease);

                if (added.Id == 0)
                {
                    return StatusCode(400, "Lease exists or overlaps");
                }

                return StatusCode(201, added);
            }

            {
                var updated = _repository.UpdateLease(lease);
                if (updated.Id == 0)
                {
                    return StatusCode(400, "Lease Overlaps with another for this property");
                }

                return StatusCode(201, updated);
            }

        }

        [HttpPost("delete")]
        public IActionResult Delete([FromBody] Lease lease)
        {
            var deleted = _repository.DeleteLease(lease);
            return Ok(deleted);
        }
    }
}

