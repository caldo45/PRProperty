using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PrApi.Model;
using PrApi.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PrApi.Repositories;

namespace PrApi.Controllers
{
    [Route("api/[controller]")]
    public class PaymentsController : Controller
    {
        private readonly IUserRepository _repository;

        public PaymentsController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var payments = _repository.GetPayments();
            return Ok(payments);

        }

        [HttpGet("byClient{id}")]
        public IActionResult Get(int clientId)
        {
            var payments = _repository.GetPaymentsByUser(clientId);
            return Ok(payments);

        }
    }
}
