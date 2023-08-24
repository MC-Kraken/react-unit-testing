using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class AddingCompletedColumnToToDoItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "ToDoItems",
                type: "INTEGER",
                nullable: false, 
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDate",
                table: "ToDoItems",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "ToDoItems");
        }
    }
}
