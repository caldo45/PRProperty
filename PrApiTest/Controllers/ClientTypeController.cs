using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using PrApiTest.Model;
using PrApiTest.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PrApiTest.Repositories;

namespace PrApiTest.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class ClientTypesController : Controller
    {
        private readonly IUserRepository _repository;

        public ClientTypesController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var rooms = _repository.GetClientTypes();
            return Ok(rooms);

        }

    }
}
