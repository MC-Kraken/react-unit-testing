using Api.Controllers;
using Api.Db;
using Api.Models;
using Api.Unit.Tests.Extensions;
using AutoBogus;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq.AutoMock;

namespace Api.Unit.Tests;

public class ToDoListController_should_
{
    [Fact]
    public async Task create_a_todo_item()
    {
        // Arrange
        var mocker = new AutoMocker();
        var request = AutoFaker.Generate<ToDoItemCreateRequest>();
        var expectedToDoItem = new ToDoItem
        {
            Description = request.Description,
            DueDate = request.DueDate,
            Priority = request.Priority
        };

        var options = new DbContextOptionsBuilder<ToDoContext>()
            .EnableSensitiveDataLogging()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        await using var context = new ToDoContext(options);
        mocker.Use(context);

        var controller = mocker.CreateInstance<ToDoItemsController>();

        // Act
        var actual = controller.Post(request);

        // Assert
        context.ToDoItems.Should().ContainEquivalentOf(expectedToDoItem, options => 
            options.Excluding(x => x.Id));
        var createdResult = actual.Should().BeOfTypeAndReturn<CreatedResult>();
        createdResult.Value.Should().BeEquivalentTo(expectedToDoItem, options => options.Excluding(x => x.Id));
    }
}