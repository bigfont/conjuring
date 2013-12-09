namespace MyConjuringDbApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSubtitle : DbMigration
    {
        public override void Up()
        {
            
        }
        
        public override void Down()
        {
            DropColumn("dbo.Books", "Subtitle");
        }
    }
}
