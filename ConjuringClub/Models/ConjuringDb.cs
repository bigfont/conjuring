using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MyConjuringDbApi.Models
{
    public class ConjuringDb : IdentityDbContext<IdentityUser>
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Authors> Authors { get; set; }
        public DbSet<Publishers> Publishers { get; set; }

        public ConjuringDb() : base("ConjuringDb")
        {

        }
    }
}