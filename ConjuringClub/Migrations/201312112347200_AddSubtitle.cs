namespace MyConjuringDbApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSubtitle : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "SubTitle", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Books", "SubTitle");
        }
    }
}
