import faker from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { ToDoItemAdder } from "./ToDoItemAdder";
import userEvent from "@testing-library/user-event";
import { ToDoItem } from "../../models/toDoItem";
import * as toDoService from "../../services/toDoService";
import {toDoItemPriority} from "../../enums/toDoItemPriority";

describe("ToDoItemAdder", () => {
    it("should allow a user to add a to-do item", async () => {
        const handleAddMock = jest.fn();
        let spy = jest.spyOn(toDoService, "addToDoItem").mockResolvedValue(new Response());
        let buttonText = faker.lorem.word();

        // Arrange
        render(<ToDoItemAdder buttonText={buttonText} toDoList={createToDoItems(3)} handleAdd={handleAddMock} />);

        // Act
        const expectedDescription = faker.lorem.word()
        userEvent.paste(screen.getByLabelText("todo-input"), expectedDescription);

        const dateToPaste = "04/22/1993";
        const expectedDate = new Date("1993-04-22T07:00:00.000Z");
        userEvent.paste(screen.getByPlaceholderText("Choose a due date"), dateToPaste)

        userEvent.click(screen.getByRole("button", {name: "Low"}));
        const testPriority = "High"
        const expectedPriorityEnumValue = 2;
        userEvent.click(await screen.findByText(testPriority))

        userEvent.click(screen.getByRole("button", {name: buttonText}))

        // Assert
        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(expectedDescription, expectedDate, expectedPriorityEnumValue);
            expect(handleAddMock).toHaveBeenCalledTimes(1);
        });
    });

    it("should not allow a user to add a duplicate to-do item", async () => {
        const existingListItem = createToDoItems(1)[0];
        jest.spyOn(toDoService, "addToDoItem").mockResolvedValue(new Response());
        let buttonText = faker.lorem.word();
        
        // Arrange
        render(<ToDoItemAdder buttonText={buttonText} toDoList={[existingListItem]} handleAdd={jest.fn()} />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, existingListItem.description);
        userEvent.click(screen.getByText(buttonText));

        // Assert
        await waitFor(async () => {
            expect(await screen.findByText("You already have that on your list")).toBeInTheDocument();
        });

        //Act
        userEvent.paste(input, faker.lorem.word());
        userEvent.click(screen.getByText(buttonText));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText("You already have that on your list")).not.toBeInTheDocument();
        });
    });
})

export const createToDoItems = (numberToCreate: number = 3): ToDoItem[] => {
    let items: ToDoItem[] = [];

    for (let i = 0; i < numberToCreate; i++) {
        items.push({
            id: i,
            description: faker.lorem.word(),
            dueDate: faker.date.future(),
            priority: toDoItemPriority.Medium,
            completed: false,
            completedDate: null
        })
    }

    return items;
}