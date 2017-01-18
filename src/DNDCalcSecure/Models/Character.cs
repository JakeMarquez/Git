using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DNDCalcSecure.Models
{
    public class Character
    {
        
        public int Id { get; set; }
        [Required ]
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
    }
}
