using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using PrApi.Model;
using PrApi.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PrApi.Repositories;

namespace PrApi.Controllers
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
