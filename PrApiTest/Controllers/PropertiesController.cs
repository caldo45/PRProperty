using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PrApi.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PrApi.Model;
using PrApi.Repositories;

namespace PrApi.Controllers
{
    [Route("api/[controller]")]
    public class PropertiesController : Controller
    {
        private readonly IUserRepository _repository;

        public PropertiesController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var properties = _repository.GetProperties();
            return Ok(properties);

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var property = _repository.GetProperty(id);
            return Ok(property);
        }

        [HttpGet("byLandlord{landlordId}")]
        public IActionResult GetByLandlord(int landlordId)
        {
            var properties = _repository.GetByLandlordId(landlordId);
            return Ok(properties);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Property property)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            if (property.Id == 0)
            {
                var added = _repository.AddProperty(property);
                return StatusCode(201, added);
            }

            {
                var updated = _repository.UpdateProperty(property);
                return StatusCode(201, updated);
            }

        }

        [HttpGet("images/{propertyId}")]
        public IActionResult GetImagesByProperty(int propertyId)
        {
            var propertyImages = _repository.GetPropertyImages(propertyId);
            return Ok(propertyImages);
        }

        [HttpGet("allProperties")]
        public IActionResult GetAllPropertiesImages()
        {
            var propertyImages = _repository.GetAllPropertiesImages();
            return Ok(propertyImages);
        }

        [HttpPost("deleteImage")]
        public IActionResult Post([FromBody]PropertyImage image)
        {
            var deleted = _repository.DeletePropertyImage(image);
            return StatusCode(201, deleted);
        }

    }
}
