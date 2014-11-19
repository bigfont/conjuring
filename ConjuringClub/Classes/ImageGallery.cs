using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using ImageProcessor;
using ImageProcessor.Imaging;
using System.Drawing;
using System.Drawing.Imaging;

public class ImageGallery
{
    public static IEnumerable<FileInfo> GetGalleryImages(string imageDirectory)
    {
        var imagesDir = HttpContext.Current.Server.MapPath("~/images" + imageDirectory);
        if (!Directory.Exists(imagesDir))
        {
            return Enumerable.Empty<FileInfo>();
        }

        var fileInfos = Directory.GetFiles(imagesDir, "*.jpg").Select(s => new FileInfo(s));
        return fileInfos;
    }

    public static string ImageSrc_Resized(FileInfo fileInfo, Size size)
    {
        var saveDirectory = Path.Combine(fileInfo.Directory.FullName, "resized");
        Directory.CreateDirectory(saveDirectory);

        var savePath = Path.Combine(saveDirectory, fileInfo.Name);
        var imgSrc = ImageGallery.ImageSrc_Original(savePath);

        if (!File.Exists(savePath))
        {
            byte[] imageBytes = File.ReadAllBytes(fileInfo.FullName);
            using (MemoryStream inStream = new MemoryStream(imageBytes))
            {
                using (MemoryStream outStream = new MemoryStream())
                {
                    using (ImageFactory imageFactory = new ImageFactory())
                    {
                        imageFactory
                            .Load(inStream)
                            .Resize(size)
                            .Save(outStream);
                    }

                    Image.FromStream(outStream).Save(savePath, ImageFormat.Jpeg);
                }
            }
        }

        return imgSrc;
    }

    public static string ImageSrc_Original(string savePath)
    {
        var siteDir = HttpContext.Current.Server.MapPath("~/");
        return savePath.Replace(siteDir, string.Empty).Replace("\\", "/"); ;
    }

    public static string ImgTitle(FileInfo fileInfo)
    {
        var imgTitle = ImageGallery.FileNameWithoutExtension(fileInfo);
        return imgTitle;
    }

    public static string FileNameWithoutExtension(FileInfo fileInfo)
    {
        return fileInfo.Name.Substring(0, fileInfo.Name.Length - fileInfo.Extension.Length);
    }
}
