using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DNDCalcSecure.ViewModels
{
    public class CharacterVM : IValidatableObject
    {

        public int Id { get; set; }
        [Required]
        public string Name { get; set; } // character name
        [Required]
        public string Author { get; set; } //username who created
        [Required]
        public double AbilityScores { get; set; } //STRDEXCONWISINTCHA
        [Required]
        public string Class { get; set; }
        [Required]
        public string Race { get; set; }
        [Required]
        public string Subrace { get; set; }
        [Required]
        public string Background { get; set; }
        [Required]
        public string Proficiencies { get; set; }
        [Required]
        public string Abilities { get; set; }
        [Required]
        public string Speed { get; set; }
        public string IBF { get; set; }
        public string SpellSlots { get; set; }
        public string Equipment { get; set; }
        [Required]
        public Boolean IsPublic { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();
            //var spacesRegex = new Regex("/([ ])+/g");
            //var illegalRegex = new Regex("/([^A-z ])/g");
            var fRegex = new Regex("[^A-z0-9]");

            if (String.IsNullOrWhiteSpace(this.Name)) // Null Check
            {
                results.Add(new ValidationResult("Name is required!", new string[] { "Name" }));
            }
            if (this.Name.Count() < 5 || this.Name.Count() > 20) // Length Check
            {
                results.Add(new ValidationResult("Names must be between 4 and and 20 characters!", new string[] { "Name" }));
            }
            if ((this.Name.ToUpper()).Contains("FUCK") // Swear Word Check 
                || (this.Name.ToUpper()).Contains("SHIT") 
                || (this.Name.ToUpper()).Contains("DAMN") 
                || (this.Name.ToUpper()).Contains("ASS")
                || (this.Name.ToUpper()).Contains("CUNT")
                || (this.Name.ToUpper()).Contains("DICK")
                || (this.Name.ToUpper()).Contains("BITCH")
                || (this.Name.ToUpper()).Contains("FAGGOT")
                || (this.Name.ToUpper()).Contains("NIGGER")
                || (this.Name).ToUpper().Contains("DILDO"))
            {
                results.Add(new ValidationResult("Names cannot include swear words!", new string[] { "Name" }));
            }
            if (fRegex.IsMatch(this.Name))
            {
                results.Add(new ValidationResult("Names cannot include special characters!", new string[] { "Name" }));
            }

            return results;
        }
    }
}
