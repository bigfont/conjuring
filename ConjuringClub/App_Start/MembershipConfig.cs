using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace ConjuringClub
{
    public class MembershipConfig
    {
        public static void CreateLoginsAndRoles(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            string path = HttpContext.Current.Server.MapPath(@"~/Private/admin-login.json");
            if (File.Exists(path))
            {
                string json = File.ReadAllText(path);
                JObject o = JObject.Parse(json);

                string username = (string)o["username"];
                string password = (string)o["password"];
                string role = "admin";

                if (!roleManager.RoleExists(role))
                {
                    roleManager.Create(new IdentityRole(role));
                }

                if (userManager.FindByName(username) == null)
                {
                    IdentityUser user = new IdentityUser(username);
                    IdentityResult result = userManager.Create(user, password);
                    if (result.Succeeded && !userManager.IsInRole(user.Id, role))
                    {
                        userManager.AddToRole(user.Id, role);
                    }
                }
            }
        }
    }
}