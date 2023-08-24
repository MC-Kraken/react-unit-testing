import { ToDoItem } from "../../models/toDoItem";
import faker from "@faker-js/faker";
import { toDoItemPriority } from "../../enums/toDoItemPriority";
import * as toDoService from "../../services/toDoService";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoListItemCompleteButton } from "../ToDoListItemCompleteButton/ToDoListItemCompleteButton";
import React from "react";
import { ToDoListItemEditButton } from "./ToDoListItemEditButton";

describe("ToDoListItemEditButton", () => {
    it("should allow a user to edit a to-do item", async () => {
        // Arrange
        const item: ToDoItem = {
            id: Math.random() * 100,
            description: faker.lorem.word(),
            dueDate: faker.date.future(),
            priority: toDoItemPriority.Medium,
            completed: false,
            completedDate: null
        }
        jest.spyOn(toDoService, "editToDoItem").mockResolvedValue(new Response());
        const handleEditItemMock = jest.fn();

        render(<ToDoListItemEditButton handleEdit={handleEditItemMock} priority={item.priority}
                                       id={item.id} dueDate={item.dueDate!.toDateString()}
                                       description={item.description} />)

        // Act
        fireEvent.click(screen.getByLabelText(`edit-${item.description}-${item.id}`));
        fireEvent.click(screen.getByRole("button", { name: "Update" }));

        // Assert
        await waitFor(() => {
            expect(handleEditItemMock).toBeCalledTimes(1);
        });
    });
});