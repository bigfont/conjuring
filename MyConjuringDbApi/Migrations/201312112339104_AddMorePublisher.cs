namespace MyConjuringDbApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMorePublisher : DbMigration
    {
        public override void Up()
        {
            ////AddColumn("dbo.Books", "PublishYear", c => c.Int(nullable: false));
            ////AddColumn("dbo.Books", "PublisherID", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Books", "PublisherID");
            DropColumn("dbo.Books", "PublishYear");
        }
    }
}
