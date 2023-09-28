import faker from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoItem } from "../../models/toDoItem";
import * as toDoService from "../../services/toDoService";
import React from "react";
import { ToDoListItemCompleteButton } from "./ToDoListItemCompleteButton";
import { toDoItemPriority } from "../../enums/toDoItemPriority";
import userEvent from "@testing-library/user-event";

describe("ToDoListItemCompleteButton", () => {
    it("should allow a user to complete a to-do item", async () => {
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
        const handleCompleteItemMock = jest.fn();

        render(<ToDoListItemCompleteButton toDoItem={item} handleComplete={handleCompleteItemMock} />)

        // Act
        userEvent.click(screen.getByLabelText(`complete-${item.description}-${item.id}`));

        // Assert
        await waitFor(() => {
            expect(handleCompleteItemMock).toBeCalledTimes(1);
        });
    });
});