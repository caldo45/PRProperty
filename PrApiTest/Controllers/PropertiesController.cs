using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
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
        private readonly IHostingEnvironment _hostingEnvironment;

        public PropertiesController(IUserRepository repository, IHostingEnvironment hostingEnvironment)
        {
            _repository = repository;
            _hostingEnvironment = hostingEnvironment;
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

        [HttpGet("imageForEach")]
        public IActionResult GetImageForEachProperty()
        {
            var propertyImages = _repository.GetImageForEachProperty();
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
            var imageFromDb = _repository.GetPropertyImage(image.Id);
            string webRootPath = _hostingEnvironment.WebRootPath;

            var imagePath = imageFromDb.ImagePath.Replace('/', '\\');
            var fullPath = Path.Combine(webRootPath,"uploads", imagePath);
            _repository.DeletePropertyImage(imageFromDb, fullPath);
            return StatusCode(202);
        }

    }
}
