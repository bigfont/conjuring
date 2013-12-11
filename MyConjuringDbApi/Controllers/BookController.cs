using MyConjuringDbApi.Models;
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
            List<BookDetails> books = new List<BookDetails>();

            ConjuringDb db = new ConjuringDb();
            db.Database.Connection.ConnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_ConjuringDb");

            var query = from b in db.Books
                        join au in db.Authors on b.AuthorID equals au.ID
                        select new BookDetails()
                        {
                            Title = b.Title,
                            FirstName = au.FirstName,
                            LastName = au.LastName
                        };

            books.AddRange(query.ToList<BookDetails>());

            return books;
        }
    }
}