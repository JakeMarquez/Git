using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using DNDCalcSecure.Services;
using DNDCalcSecure.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DNDCalcSecure.API
{
    [Route("api/[controller]")]
    public class SecretsController : Controller
    {
        private IList<Character> characterResource;

        public SecretsController(CharacterService characterService)
        {
            this.characterResource = characterService.listCharacters();
        }
        // GET: api/values
        [HttpGet]
        public IList<Character> Get()
        {
            return this.characterResource;
        }


    }
}
