using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace TemplateApp.Infrastructure
{
    public class AppDbContextInitializer(ILogger<AppDbContextInitializer> logger, AppDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        private readonly ILogger<AppDbContextInitializer> _logger = logger;
        private readonly AppDbContext _context = context;
        private readonly UserManager<IdentityUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;

        public async Task InitialiseAsync()
        {
            try
            {
                if (_context.Database.IsNpgsql())
                {
                    await _context.Database.MigrateAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initialising the database.");
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }
        public async Task TrySeedAsync()
        {
            // Default roles
            var administratorRole = new IdentityRole("Administrator");

            if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
            {
                var role = await _roleManager.CreateAsync(administratorRole);
                if (role != null)
                {
                    await _roleManager.AddClaimAsync(administratorRole, new Claim("RoleClaim", "HasRoleView"));
                    await _roleManager.AddClaimAsync(administratorRole, new Claim("RoleClaim", "HasRoleAdd"));
                    await _roleManager.AddClaimAsync(administratorRole, new Claim("RoleClaim", "HasRoleEdit"));
                    await _roleManager.AddClaimAsync(administratorRole, new Claim("RoleClaim", "HasRoleDelete"));
                }
            }

            // Default users
            var administrator = new IdentityUser { UserName = "Admin", Email = "admin@gmail.com" };

            if (_userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await _userManager.CreateAsync(administrator, "Ti100600@");
                if (!string.IsNullOrWhiteSpace(administratorRole.Name))
                {
                    await _userManager.AddToRolesAsync(administrator, new[] { administratorRole.Name });
                }
            }

            // Default user role
            var userRole = new IdentityRole("User");

            if (_roleManager.Roles.All(r => r.Name != userRole.Name))
            {
                var role = await _roleManager.CreateAsync(userRole);
                if (role != null)
                {
                    await _roleManager.AddClaimAsync(userRole, new Claim("RoleClaim", "HasRoleView"));
                }
            }

            // Default users
            var user = new IdentityUser { UserName = "User", Email = "user@gmail.com" };

            if (_userManager.Users.All(u => u.UserName != user.UserName))
            {
                await _userManager.CreateAsync(user, "Ti100600@");
                if (!string.IsNullOrWhiteSpace(userRole.Name))
                {
                    await _userManager.AddToRolesAsync(user, new[] { userRole.Name });
                }
            }
        }
    }
}
