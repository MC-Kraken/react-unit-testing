import faker from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoItem } from "../../services/toDoItem";
import * as toDoService from "../../services/toDoService";
import React from "react";
import { ToDoListItemDeleteButton } from "./ToDoListItemDeleteButton";

describe("ToDoListItem", () => {
    it("should allow a user to delete a to-do item", async () => {
        // Arrange
        const item: ToDoItem = { id: Math.random() * 100, description: faker.lorem.word(), dueDate: faker.date.future() }
        jest.spyOn(toDoService, "deleteToDoItem").mockResolvedValue(new Response());
        const handleDeleteItemMock = jest.fn();

        render(<ToDoListItemDeleteButton toDoItem={item} handleDelete={handleDeleteItemMock}/>)

        // Act
        fireEvent.click(screen.getByLabelText(`delete-${item.description}-${item.id}`));

        // Assert
        await waitFor(() => {
            expect(handleDeleteItemMock).toBeCalledTimes(1);
        });
    });
});