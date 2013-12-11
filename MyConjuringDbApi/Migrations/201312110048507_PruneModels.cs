namespace MyConjuringDbApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PruneModels : DbMigration
    {
        public override void Up()
        {
            ////CreateTable(
            ////    "dbo.Authors",
            ////    c => new
            ////        {
            ////            ID = c.Int(nullable: false, identity: true),
            ////            FirstName = c.String(),
            ////            LastName = c.String(),
            ////        })
            ////    .PrimaryKey(t => t.ID);
            
            ////CreateTable(
            ////    "dbo.Books",
            ////    c => new
            ////        {
            ////            ID = c.Int(nullable: false, identity: true),
            ////            Title = c.String(),
            ////            AuthorID = c.Int(nullable: false),
            ////        })
            ////    .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Books");
            DropTable("dbo.Authors");
        }
    }
}
