using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlexDuzik.ProfileSite.Data.Migrations
{
    public partial class Addpermalink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Permalink_Month",
                table: "Posts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Permalink_Slug",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Permalink_Year",
                table: "Posts",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permalink_Month",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Permalink_Slug",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Permalink_Year",
                table: "Posts");
        }
    }
}
