using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ConjuringClub.ViewModels
{
    public class FigureAsideViewModel
    {
        public string Src { get; set; }
        public string FigCaption { get; set; }
        public FigureAsideViewModel(string src, string figCaption)
        {
            this.Src = src;
            this.FigCaption = figCaption;
        }
    }
}