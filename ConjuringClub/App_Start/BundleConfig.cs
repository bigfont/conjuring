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
            BundleTable.EnableOptimizations = false;
            
            bundles.Add(new ScriptBundle("~/bundles/javascript").Include(
                "~/Scripts/google-analytics-object.js",
                "~/Scripts/controllers/*.js",
                "~/Scripts/bigfont-toc.js",
                "~/Scripts/app.js"));

            bundles.Add(new StyleBundle("~/bundles/css").Include("~/Content/app.css"));
        }
    }
}
