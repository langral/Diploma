using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebApp.Migrations
{
    public partial class NewModelComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Record",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Visit",
                table: "Record",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Faculty",
                table: "Magazine",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Filial",
                table: "Magazine",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Level",
                table: "Magazine",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Semester",
                table: "Magazine",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfClass",
                table: "Magazine",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Magazine",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MagazineId = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    note = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Record");

            migrationBuilder.DropColumn(
                name: "Visit",
                table: "Record");

            migrationBuilder.DropColumn(
                name: "Faculty",
                table: "Magazine");

            migrationBuilder.DropColumn(
                name: "Filial",
                table: "Magazine");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "Magazine");

            migrationBuilder.DropColumn(
                name: "Semester",
                table: "Magazine");

            migrationBuilder.DropColumn(
                name: "TypeOfClass",
                table: "Magazine");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Magazine");
        }
    }
}
