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
    public class PaymentTypesController : Controller
    {
        private readonly IUserRepository _repository;

        public PaymentTypesController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var paymentTypes = _repository.GetPaymentTypes();
            return Ok(paymentTypes);

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var paymentType = _repository.GetPaymentType(id);
            return Ok(paymentType);
        }

        [HttpPost]
        public IActionResult Post(PaymentType paymentType)
        {
            var added = _repository.AddPaymentType(paymentType);
            return StatusCode(201, added);
        }

    }
}
