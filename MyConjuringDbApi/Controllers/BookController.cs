﻿using MyConjuringDbApi.Models;
using MyConjuringDbApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyConjuringDbApi.Controllers
{
    public class BookController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<BookDetails> Get()
        {
            ////ConjuringDb db = new ConjuringDb();

            ////var query = from b in db.Books
            ////            join au in db.Authors on b.AuthorID equals au.ID
            ////            select new BookDetails() { 
            ////                Title = b.Title, 
            ////                FirstName = au.FirstName, 
            ////                LastName = au.LastName 
            ////            };


            ////return query.AsEnumerable<BookDetails>();

            string connString = Environment.GetEnvironmentVariable("SQLCONNSTR_ConjuringDb");
            BookDetails deet = new BookDetails() { Title = connString };

            return new List<BookDetails>() { deet };
        }        
    }
}