using Api.Controllers;
using Api.Db;
using Api.Models;
using Api.Unit.Tests.Extensions;
using AutoBogus;
using FluentAssertions;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq.AutoMock;
using Newtonsoft.Json.Serialization;

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

    [Fact]
    public async Task get_a_todo_item()
    {
        // Arrange
        var mocker = new AutoMocker();
        var expectedToDoItems = AutoFaker.Generate<ToDoItem>(3);

        var options = new DbContextOptionsBuilder<ToDoContext>()
            .EnableSensitiveDataLogging()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        await using var context = new ToDoContext(options);
        context.ToDoItems.AddRange(expectedToDoItems);
        await context.SaveChangesAsync();
        mocker.Use(context);

        var controller = mocker.CreateInstance<ToDoItemsController>();

        // Act
        var actual = controller.Get();

        // Assert
        context.ToDoItems.Should().BeEquivalentTo(expectedToDoItems);
        var okObjectResult = actual.Should().BeOfTypeAndReturn<OkObjectResult>();
        okObjectResult.Value.Should().BeEquivalentTo(expectedToDoItems);
    }

    [Fact]
    public async Task patch_a_todo_item()
    {
        // Arrange
        var mocker = new AutoMocker();
        var originalToDoItem = AutoFaker.Generate<ToDoItem>();
        var newDescription = AutoFaker.Generate<string>();
        var expectedToDoItem = new ToDoItem
        {
            Id = originalToDoItem.Id,
            Description = newDescription,
            DueDate = originalToDoItem.DueDate,
            Priority = originalToDoItem.Priority,
            Completed = originalToDoItem.Completed,
            CompletedDate = originalToDoItem.CompletedDate
        };

        var jsonApiRequest = new JsonPatchDocument<ToDoItem>();
        jsonApiRequest.Operations.Add(new Operation<ToDoItem>("replace", "/description", originalToDoItem.Description,
            newDescription));
        jsonApiRequest.ContractResolver = new DefaultContractResolver();

        var options = new DbContextOptionsBuilder<ToDoContext>()
            .EnableSensitiveDataLogging()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        await using var context = new ToDoContext(options);
        context.ToDoItems.Add(originalToDoItem);
        await context.SaveChangesAsync();
        mocker.Use(context);

        var controller = mocker.CreateInstance<ToDoItemsController>();

        // Act
        var actual = await controller.Patch(originalToDoItem.Id, jsonApiRequest);

        // Assert
        context.ToDoItems.Should().ContainEquivalentOf(expectedToDoItem);
        actual.Should().BeOfType<OkResult>();
    }
}