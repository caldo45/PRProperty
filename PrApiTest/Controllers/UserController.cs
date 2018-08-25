using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PrApiTest.Model;
using PrApiTest.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PrApiTest.Repositories;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Web;

namespace PrApiTest.Controllers
{
    [Route("api/[controller]")]
    public class UserController: Controller
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
        public IActionResult Post([FromBody]Client user)
        {
            var added = _repository.AddUser(user);
            return StatusCode(201, added);
        }

        [HttpPost("UploadFile"), DisableRequestSizeLimit]
        public ActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                var clientId = HttpContext.Request.Form["clientId"];
                var imageTypeFolder = HttpContext.Request.Form["imageType"];
                string rootFolderName = "Uploads";
                string imageFolder = clientId;
                string fullPath = null;
                string apiPath = null;
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, rootFolderName, imageTypeFolder, imageFolder);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string uploadFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string ext = Path.GetExtension(uploadFileName);

                    string fileName = clientId+ext;
                    string localHost = "http:\\\\localhost:54183";
                    fullPath = Path.Combine(newPath, fileName);
                    apiPath = Path.Combine(localHost, rootFolderName, imageTypeFolder, imageFolder, fileName);
                    int clientIdInt = Int32.Parse(clientId);
                    _repository.AddUserImage(clientIdInt, apiPath);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                return Json(apiPath);
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }
    }

}
