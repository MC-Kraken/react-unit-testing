import faker from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoItem } from "../../models/toDoItem";
import * as toDoService from "../../services/toDoService";
import React from "react";
import { ToDoListItemCompleteButton } from "./ToDoListItemCompleteButton";
import { toDoItemPriority } from "../../enums/toDoItemPriority";

describe("ToDoListItemDeleteButton", () => {
    it("should allow a user to delete a to-do item", async () => {
        // Arrange
        const item: ToDoItem = {
            id: Math.random() * 100,
            description: faker.lorem.word(),
            dueDate: faker.date.future(),
            priority: toDoItemPriority.Medium,
            completed: false,
            completedDate: null
        }
        jest.spyOn(toDoService, "completeToDoItem").mockResolvedValue(new Response());
        const handleDeleteItemMock = jest.fn();

        render(<ToDoListItemCompleteButton toDoItem={item} handleComplete={handleDeleteItemMock} />)

        // Act
        fireEvent.click(screen.getByLabelText(`complete-${item.description}-${item.id}`));

        // Assert
        await waitFor(() => {
            expect(handleDeleteItemMock).toBeCalledTimes(1);
        });
    });
});