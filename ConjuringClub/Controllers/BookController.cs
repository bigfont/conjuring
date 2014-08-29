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
        public IEnumerable<BookDetailsViewModel> Get()
        {
            List<BookDetailsViewModel> books = new List<BookDetailsViewModel>();

            ConjuringDb db = new ConjuringDb();

            // TODO Determine if it's necessary to get the connString from an environmental variable.
            //db.Database.Connection.ConnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_ConjuringDb");            

            var query = from b in db.Books
                        join au in db.Authors on b.AuthorID equals au.ID
                        join p in db.Publishers on b.PublisherID equals p.ID
                        select new BookDetailsViewModel()
                        {
                            Title = b.Title,
                            PublishYear = b.PublishYear,
                            FirstName = au.FirstName,
                            LastName = au.LastName,
                            Publisher = p.Name,
                            PublishLocation = p.Location
                        };

            books.AddRange(query.ToList<BookDetailsViewModel>());

            return books;
        }
    }
}