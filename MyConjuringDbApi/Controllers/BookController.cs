using MyConjuringDbApi.Models;
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
        public IEnumerable<Book> Get()
        {
            ConjuringDb db = new ConjuringDb();
            return db.Books;
        }
    }
}