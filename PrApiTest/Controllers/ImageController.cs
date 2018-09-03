using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PrApi.Repositories;

namespace PrApi.Controllers
{
    [Route("api/[controller]")]
    public class ImagesController : Controller
    {

        private readonly IUserRepository _repository;
        private IHostingEnvironment _hostingEnvironment;

        public ImagesController(IUserRepository repository, IHostingEnvironment hostingEnvironment, IConfiguration con)
        {
            _repository = repository;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("UploadFile"), DisableRequestSizeLimit]
        public ActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                var assetId = HttpContext.Request.Form["assetId"];
                var imageTypeFolder = HttpContext.Request.Form["imageType"];
                string rootFolderName = "Uploads";
                string imageFolder = assetId;
                string apiPath = null;
                string webRootPath = _hostingEnvironment.WebRootPath;
              
                if (file.Length > 0)
                {
                    string uploadFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string ext = Path.GetExtension(uploadFileName);
                    int assetIdInt = Int32.Parse(assetId);

                    string time = DateTime.Now.ToString("hh.mm.ss.ffffff");
                    var fileName = imageTypeFolder.Equals("client") ? assetId + ext : assetId + time + ext;
                    apiPath = Path.Combine(imageTypeFolder, imageFolder, fileName);
                    apiPath = apiPath.Replace('\\', '/');
                    // var uri = new Uri(apiPath);

                    if (imageTypeFolder.Equals("client"))
                    {
                        _repository.AddUserImage(assetIdInt, apiPath);
                    }

                    if (imageTypeFolder.Equals("room"))
                    {
                        _repository.AddRoomImage(assetIdInt, apiPath);
                    }

                    if (imageTypeFolder.Equals("property"))
                    {
                        _repository.AddPropertyImage(assetIdInt, apiPath);
                    }


                    var fullPath = Path.Combine(webRootPath, rootFolderName, apiPath);
                    string fileFolder = Path.Combine(webRootPath, rootFolderName, imageTypeFolder, imageFolder);
                    if (!Directory.Exists(fileFolder))
                    {
                        Directory.CreateDirectory(fileFolder);
                    }
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

