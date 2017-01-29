using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using DNDCalcSecure.Models;

namespace DNDCalcSecure.Data
{
    public class SampleData
    {
        public async static Task Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<ApplicationDbContext>();
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            // Ensure db
            context.Database.EnsureCreated();

            // Ensure Stephen (IsAdmin)
            //var stephen = await userManager.FindByNameAsync("Stephen.Walther@CoderCamps.com");
            //if (stephen == null)
            //{
            //    // create user
            //    stephen = new ApplicationUser
            //    {
            //        UserName = "Stephen.Walther@CoderCamps.com",
            //        Email = "Stephen.Walther@CoderCamps.com",
            //        usedCreationForm = false
            //    };
            //    await userManager.CreateAsync(stephen, "Secret123!");

            //    // add claims
            //    await userManager.AddClaimAsync(stephen, new Claim("IsAdmin", "true"));
            //}

            //// Ensure jake (not IsAdmin)
            //var jake = await userManager.FindByNameAsync("JDOG");
            //if (jake == null)
            //{
            //    // create user
            //    jake = new ApplicationUser
            //    {
            //        UserName = "JDOG",
            //        Email = "marcusfenixdubstep@gmail.com",
            //        usedCreationForm = false
            //    };
            //    await userManager.CreateAsync(jake, "Password_1");
            //}


        }

    }
}
