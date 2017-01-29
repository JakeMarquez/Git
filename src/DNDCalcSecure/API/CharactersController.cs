using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DNDCalcSecure.Services;
using DNDCalcSecure.Models;
using DNDCalcSecure.Data;
using DNDCalcSecure.ViewModels;
using Microsoft.AspNetCore.Identity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DNDCalcSecure.API
{
    [Route("api/[controller]")]
    public class CharactersController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private IList<Character> characterResource;
        private ApplicationDbContext db;

        public CharactersController(
            CharacterService characterService,
            UserManager<ApplicationUser> userManager)
        {
            this._userManager = userManager;
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
        public IActionResult Post([FromBody]CharacterVM character)
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
                var newCharacter = new Character() {
                    Name = character.Name,
                    Author = character.Author,
                    AbilityScores = character.AbilityScores,
                    Class = character.Class,
                    Race = character.Race,
                    Subrace = character.Subrace,
                    Background = character.Background,
                    Proficiencies = character.Proficiencies,
                    Abilities = character.Abilities,
                    Speed = character.Speed,
                    IBF = character.IBF,
                    SpellSlots = character.SpellSlots,
                    Equipment = character.Equipment,
                    IsPublic = character.IsPublic
                };
                this.usedCreationForm().Wait();
                this.db.Characters.Add(newCharacter);
                this.db.SaveChanges();
                return Ok(this.ModelState);
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
        /// <summary>
        /// Checks if the user has used this form before and if its their first time it changes it to true
        /// </summary>
        /// <returns>bool</returns>
        private async Task usedCreationForm()
        {
            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            if (currentUser.usedCreationForm.Equals(true)) { return; };
            if (currentUser.usedCreationForm.Equals(false)) { currentUser.toggle(); return; }
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
