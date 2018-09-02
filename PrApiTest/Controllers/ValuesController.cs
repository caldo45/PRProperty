using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PrApi.Database;
using PrApi.Repositories;

namespace PrApi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly UserDbContext _db;

        public ValuesController(UserDbContext db)
        {
            _db = db;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("user")]
        public IActionResult Users()
        {
            var repo = new UserRepository(_db);
            return Ok(repo.GetUsers());
        }

        [HttpGet("properties")]
        public IActionResult Properties()
        {
            var repo = new UserRepository(_db);
            return Ok(repo.GetProperties());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
