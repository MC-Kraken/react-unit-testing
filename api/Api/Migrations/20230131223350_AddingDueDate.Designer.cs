﻿// <auto-generated />
using System;
using Api.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Api.Migrations
{
    [DbContext(typeof(ToDoContext))]
    [Migration("20230131223350_AddingDueDate")]
    partial class AddingDueDate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.5");

            modelBuilder.Entity("Api.Db.ToDoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ToDoItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Pick up groceries",
                            DueDate = new DateTime(2023, 1, 31, 22, 33, 50, 679, DateTimeKind.Utc).AddTicks(8630)
                        },
                        new
                        {
                            Id = 2,
                            Description = "Go to bank",
                            DueDate = new DateTime(2023, 1, 31, 22, 33, 50, 679, DateTimeKind.Utc).AddTicks(8640)
                        },
                        new
                        {
                            Id = 3,
                            Description = "Go to post office",
                            DueDate = new DateTime(2023, 1, 31, 22, 33, 50, 679, DateTimeKind.Utc).AddTicks(8640)
                        });
                });
#pragma warning restore 612, 618
        }
    }
}