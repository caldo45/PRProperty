using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PrApiTest.Model;
using PrApiTest.Repositories;

namespace PrApiTest.Controllers
{
    [Route("api/[controller]")]
    public class NotificationsController : Controller
    {
        private readonly IUserRepository _repository;

        public NotificationsController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var notifications = _repository.GetContractNotifications();
            return Ok(notifications);

        }

        [HttpPost]
        public IActionResult Post([FromBody]int activate)
        {

            if (activate == 1)
            {
                _repository.AddContractNotifications(30);
                _repository.AddContractNotifications(60);
                _repository.AddContractNotifications(90);
                
            }
            return StatusCode(201);
        }

        [HttpPost("asRead")]
        public IActionResult PostRead([FromBody]ContractNotification contractNotification
        )
        {
            var updated = _repository.markAsRead(contractNotification);
            return StatusCode(201);

        }
    }
}
