using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace DNDCalcSecure.ViewModels.Account
{
    public class RegisterViewModel : IValidatableObject
    {
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();

            // validate CustomerName
            if (String.IsNullOrWhiteSpace(this.Username))
            {
                results.Add(new ValidationResult("Username is required!", new string[] { "Username" }));
            }
            if (this.Username.Length < 4)
            {
                results.Add(new ValidationResult("Username must be between 4 and 16 characters!", new string[] { "Username" }));
            }
            return results;
        }
    }
}
