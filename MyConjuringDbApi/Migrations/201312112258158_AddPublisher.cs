namespace MyConjuringDbApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPublisher : DbMigration
    {
        public override void Up()
        {
            ////CreateTable(
            ////    "dbo.Publishers",
            ////    c => new
            ////        {
            ////            ID = c.Int(nullable: false, identity: true),
            ////            Name = c.String(),
            ////            Location = c.String(),
            ////        })
            ////    .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Publishers");
        }
    }
}
