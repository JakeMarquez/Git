using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DNDCalcSecure.Services;
using DNDCalcSecure.Models;
using DNDCalcSecure.Data;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DNDCalcSecure.API
{
    [Route("api/[controller]")]
    public class CharactersController : Controller
    {
        private IList<Character> characterResource;
        private ApplicationDbContext db;

        public CharactersController(CharacterService characterService)
        {
            this.characterResource = characterService.listCharacters();
            this.db = characterService.db;
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(this.characterResource);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Character character)
        {
            if (character == null) //modelstate checks the database validation attributes for this info
            {
                ModelState.AddModelError("", "You must be a special kind of stupid");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }
            if (character.Id == 0)
            {
                this.db.Characters.Add(character);
                this.db.SaveChanges();
            }
            else
            {
                var charactersToEdit = (from p in db.Characters where p.Id == character.Id select p).FirstOrDefault();
                charactersToEdit.Name = character.Name;
                charactersToEdit.Author = character.Author;
                charactersToEdit.AbilityScores = character.AbilityScores;
                charactersToEdit.Class = character.Class;
                charactersToEdit.Race = character.Race;
                charactersToEdit.Subrace = character.Subrace;
                charactersToEdit.Background = character.Background;
                charactersToEdit.Proficiencies = character.Proficiencies;
                charactersToEdit.Abilities = character.Abilities;
                charactersToEdit.Speed = character.Speed;
                charactersToEdit.IBF = character.IBF;
                charactersToEdit.SpellSlots = character.SpellSlots;
                charactersToEdit.IsPublic = character.IsPublic;
                db.SaveChanges();
            }

            return Ok(character);
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
