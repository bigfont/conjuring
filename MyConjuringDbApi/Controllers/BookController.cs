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

            try
            {

                var query = from b in db.Books
                            join au in db.Authors on b.AuthorID equals au.ID
                            select new BookDetails()
                            {
                                Title = b.Title,
                                FirstName = au.FirstName,
                                LastName = au.LastName
                            };

                books.AddRange(query.ToList<BookDetails>());
            }
            catch (Exception e)
            {
                books.Add(new BookDetails() { Title = e.Message, FirstName = db.Database.Connection.ConnectionString });
            }

            books.Add(new BookDetails() { Title = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_ConjuringDb") });

            foreach (System.Configuration.ConnectionStringSettings s in System.Configuration.ConfigurationManager.ConnectionStrings)
            {
                books.Add(new BookDetails() { Title = s.Name, FirstName = s.ConnectionString });
            }

            return books;
        }
    }
}