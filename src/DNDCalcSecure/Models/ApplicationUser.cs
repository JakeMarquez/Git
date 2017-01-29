using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DNDCalcSecure.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public bool usedCreationForm { get; set; }
        public void toggle()
        {
            if (this.usedCreationForm) { this.usedCreationForm = false; return; }
            else{
                this.usedCreationForm = true;
            }
        }
    }
}
