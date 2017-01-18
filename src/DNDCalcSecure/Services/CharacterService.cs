using DNDCalcSecure.Data;
using DNDCalcSecure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DNDCalcSecure.Services
{
    public class CharacterService
    {
        public ApplicationDbContext db;

        public CharacterService(ApplicationDbContext db)
        {
            this.db = db;
        }
        public IList<Character> listCharacters()
        {
            return this.db.Characters.ToList();
        }
    }
}
