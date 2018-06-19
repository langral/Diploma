using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebApp.Migrations
{
    public partial class Add_Field_FIO_To_The_Teacher_Model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupSubjectMappingModel_Group_GroupId",
                table: "GroupSubjectMappingModel");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupSubjectMappingModel_Subject_SubjectId",
                table: "GroupSubjectMappingModel");

            migrationBuilder.RenameColumn(
                name: "note",
                table: "Comment",
                newName: "Note");

            migrationBuilder.AddColumn<string>(
                name: "FIO",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupSubjectMappingModel_Group_GroupId",
                table: "GroupSubjectMappingModel",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupSubjectMappingModel_Subject_SubjectId",
                table: "GroupSubjectMappingModel",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupSubjectMappingModel_Group_GroupId",
                table: "GroupSubjectMappingModel");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupSubjectMappingModel_Subject_SubjectId",
                table: "GroupSubjectMappingModel");

            migrationBuilder.DropColumn(
                name: "FIO",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Note",
                table: "Comment",
                newName: "note");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupSubjectMappingModel_Group_GroupId",
                table: "GroupSubjectMappingModel",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupSubjectMappingModel_Subject_SubjectId",
                table: "GroupSubjectMappingModel",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
