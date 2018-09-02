using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PrApi.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Web;
using PrApi.Model;
using PrApi.Repositories;

namespace PrApi.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserRepository _repository;
        private IHostingEnvironment _hostingEnvironment;

        public UserController(IUserRepository repository, IHostingEnvironment hostingEnvironment)
        {
            _repository = repository;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var users = _repository.GetUsers();
            return Ok(users);

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _repository.GetUser(id);
            return Ok(user);
        }

        [HttpGet("GetByType{id}")]
        public IActionResult GetbyType(int id)
        {
            var user = _repository.GetUserByType(id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Client user)
        {
            if (user.Id == 0)
            {
                var added = _repository.AddUser(user);
                return StatusCode(201, added);
            }

            {
                var updated = _repository.UpdateUser(user);
                return StatusCode(201, updated);
            }
        }


        [HttpPost("delete")]
        public Client PostDelete([FromBody] Client client)
        {
            var deleted = _repository.DeleteClient(client);
            return deleted;
        }    
    }
}
