using System.Web;
using System.Web.Optimization;

namespace ConjuringClub
{
    public class BundleConfig
    {         
        public static void RegisterBundles(BundleCollection bundles)
        {
            // 
            // Files will be minified and bundled iff EnableOptimizations is true OR compilation.debug is false.
            // EnableOptimizations overrides compilation.debug attribute.
            // 
            BundleTable.EnableOptimizations = true;
            bundles.UseCdn = true;                
            
            const string angularCdn = "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular.js";
            bundles.Add(new ScriptBundle("~/cdn/angular", angularCdn).Include(
                "~/Scripts/angular.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/javascript").Include(
                "~/Scripts/google-analytics-object.js",
                "~/Scripts/app.js"));
            
            bundles.Add(new StyleBundle("~/bundles/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/app.css"));
        }
    }
}
