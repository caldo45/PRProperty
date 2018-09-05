﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using PrApi.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PrApi.Model;
using PrApi.Repositories;

namespace PrApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class RoomsController : Controller
    {
        private readonly IUserRepository _repository;

        public RoomsController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var rooms = _repository.GetRooms();
            return Ok(rooms);

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var rooms = _repository.GetRoom(id);
            return Ok(rooms);
        }


        [HttpGet("byProperty{propertyId}")]
        public IActionResult GetRoomsByProperty(int propertyId)
        {
            var rooms = _repository.GetRoomsByProperty(propertyId);
            return Ok(rooms);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Room room)
        {
            var added = _repository.AddRoom(room);
            return StatusCode(201, added);
        }

        [HttpGet("images/{roomId}")]
        public IActionResult GetImagesByRoom(int roomId)
        {
            var roomImages = _repository.GetRoomImages(roomId);
            return Ok(roomImages);
        }

        [HttpGet("image/{propertyId}")]
        public IActionResult GetOneImagesForEachRoom(int propertyId)
        {
            var roomImages = _repository.GetImageForEachRoomInProperty(propertyId);
            return Ok(roomImages);
        }

    }
}
