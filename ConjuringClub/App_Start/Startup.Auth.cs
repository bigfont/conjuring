﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using MyConjuringDbApi.Models;
using Owin;
using ConjuringClub.Providers;

namespace ConjuringClub
{
    public partial class Startup
    {
        static Startup()
        {
            PublicClientId = "self";

            // The UserStore class exposes a *very basic* user management api.
            // In the following code, we configure it to store user data
            // as type IdentityUser in the ConjuringDb data store.                      

            // The UserManager class exposes a higher level user management api, 
            // that automatically saves changes to the UserStore. 
            // In the following code, we configure it to use the UserStore that we just created.            

            // The UserManagerFactory implement the factory pattern
            // in order to get one instance of UserManager per request for the application.
            UserManagerFactory = () => new UserManager<IdentityUser>(new UserStore<IdentityUser>(new ConjuringDb()));

            RoleManagerFactory = () => new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ConjuringDb()));

            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId, UserManagerFactory),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                AllowInsecureHttp = true
            };
        }

        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static Func<UserManager<IdentityUser>> UserManagerFactory { get; set; }

        public static Func<RoleManager<IdentityRole>> RoleManagerFactory { get; set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //    consumerKey: "",
            //    consumerSecret: "");

            //app.UseFacebookAuthentication(
            //    appId: "",
            //    appSecret: "");

            //app.UseGoogleAuthentication();
        }
    }
}
