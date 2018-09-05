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
    [Authorize]
    [Route("api/[controller]")]
    public class NextOfKinController : Controller
    {
        private readonly IUserRepository _repository;

        public NextOfKinController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var nextOfKins = _repository.GetNextOfKins();
            return Ok(nextOfKins);

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var nextOfKin = _repository.GetNextOfKin(id);
            return Ok(nextOfKin);
        }

        [HttpPost]
        public IActionResult Post([FromBody] NextOfKin nextOfKin)
        {
            var added = _repository.AddNextOfKin(nextOfKin);
            return StatusCode(201, added);
        }

    }
}

