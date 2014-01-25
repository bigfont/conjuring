﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MyConjuringDbApi.Models
{
    public class ConjuringDb : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Authors> Authors { get; set; }
        public DbSet<Publishers> Publishers { get; set; }

        public ConjuringDb() : base("ConjuringDb")
        {

        }
    }
}