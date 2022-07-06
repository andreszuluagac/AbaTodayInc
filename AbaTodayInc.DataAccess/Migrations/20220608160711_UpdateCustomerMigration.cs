using Microsoft.EntityFrameworkCore.Migrations;

namespace AbaTodayInc.DataAccess.Migrations
{
    public partial class UpdateCustomerMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Customers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumberCode",
                table: "Customers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "PhoneNumberCode",
                table: "Customers");
        }
    }
}
