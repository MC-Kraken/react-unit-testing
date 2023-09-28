import { render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../../services/toDoService";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { ToDoItem } from "../../models/toDoItem";
import { toDoItemPriority } from "../../enums/toDoItemPriority";
import { formatDate } from "../../helpers/dateHelpers";

describe("ToDoList", () => {
    // true unit test
    it("should load list items", async () => {
        // Arrange
        const toDoItems = createToDoItems(2);
        jest.spyOn(toDoService, "getToDoList").mockResolvedValue(toDoItems);

        // Act
        render(<ToDoList disableVirtualization={false} />);

        // Assert
        expect(await screen.findByText(toDoItems[0].description)).toBeInTheDocument();
        expect(await screen.findByText(toDoItems[1].description)).toBeInTheDocument();
    })

    // integration test: List component + Add component
    it("should allow the user to add an item", async () => {
        // Arrange
        const expectedNewItemDescription = faker.lorem.word();
        jest.spyOn(toDoService, "getToDoList")
            .mockResolvedValueOnce([]) // initial load
            .mockResolvedValueOnce([{
                id: Math.random() * 100,
                description: expectedNewItemDescription,
                dueDate: faker.date.future(),
                priority: toDoItemPriority.Medium,
                completed: false,
                completedDate: null
            }]); // when component reloads
        jest.spyOn(toDoService, "addToDoItem").mockResolvedValue(new Response());

        // Act
        render(<ToDoList disableVirtualization={false} />);

        const input = await screen.findByLabelText("todo-input");
        userEvent.paste(input, expectedNewItemDescription);
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // TODO: add interaction with due date and priority inputs?

        // Assert
        expect(await screen.findByText(expectedNewItemDescription)).toBeInTheDocument();
    });

    // // integration test: List component + Delete component
    it("should allow the user to complete an item", async () => {
        // Arrange
        const toDoItems = createToDoItems();
        const toDoItemsWithCompleted = JSON.parse(JSON.stringify(toDoItems))
        toDoItemsWithCompleted[0].completedDate = new Date();
        toDoItemsWithCompleted[0].completed = true;
        const expectedCompletedDate = formatDate(new Date());
        jest.spyOn(toDoService, "getToDoList")
            .mockResolvedValueOnce(toDoItems) // initial load
            .mockResolvedValueOnce(toDoItemsWithCompleted); // after completion
        jest.spyOn(toDoService, "completeToDoItem").mockResolvedValue(new Response());
        const completeButtonSelector = `complete-${toDoItems[0].description}-${toDoItems[0].id}`;

        // Act
        render(<ToDoList disableVirtualization={true} />);
        userEvent.click(await screen.findByRole("button", { name: completeButtonSelector }));

        // Assert
        await waitFor(() => {
            expect(screen.queryByLabelText(completeButtonSelector)).not.toBeInTheDocument()
        });
        expect(await screen.findByText(expectedCompletedDate)).toBeVisible();
        expect(formatDate(toDoItemsWithCompleted[0].completedDate)).toEqual(expectedCompletedDate);
    });

    it("should display the number of To-Do items", async () => {
        // Arrange
        const toDoItems = createToDoItems(2);
        const expectedNewItem = createToDoItems(1)[0];
        jest.spyOn(toDoService, "getToDoList")
            .mockResolvedValueOnce(toDoItems) // initial load
            .mockResolvedValueOnce([...toDoItems, expectedNewItem]); // when component reloads
        jest.spyOn(toDoService, "addToDoItem").mockResolvedValue(new Response());

        // Act
        render(<ToDoList disableVirtualization={false} />);

        // Assert
        expect(await screen.findByText("Number of To-Do List items: 2")).toBeInTheDocument();

        // Act
        const input = await screen.findByLabelText("todo-input");
        userEvent.paste(input, expectedNewItem.description);
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        expect(await screen.findByText("Number of To-Do List items: 3")).toBeInTheDocument();
    });

    it("should show error text when user attempts to add an empty item", async () => {
        // Arrange
        const expectedErrorText = "You must enter something";
        const toDoItems = createToDoItems(2);
        jest.spyOn(toDoService, "getToDoList").mockResolvedValue(toDoItems);
        jest.spyOn(toDoService, "addToDoItem").mockResolvedValue(new Response());

        render(<ToDoList disableVirtualization={false} />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, "");
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        expect(await screen.findByText(expectedErrorText)).toBeInTheDocument();

        // Act
        userEvent.paste(input, "Something");
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedErrorText)).not.toBeInTheDocument();
        });
    });

    it("should show error text when a user attempts to add a duplicate item", async () => {
        // Arrange
        const expectedErrorText = "You already have that on your list";
        const toDoItems = createToDoItems(2);
        jest.spyOn(toDoService, "getToDoList").mockResolvedValue(toDoItems);
        jest.spyOn(toDoService, "addToDoItem").mockResolvedValue(new Response());
        render(<ToDoList disableVirtualization={false} />);

        // Act
        const input = await screen.findByLabelText("todo-input");
        userEvent.paste(input, toDoItems[0].description);
        userEvent.click(await screen.findByRole("button", { name: "Add To-Do Item" }));

        // Assert
        expect(await screen.findByText(expectedErrorText)).toBeInTheDocument();

        // Act
        userEvent.paste(input, faker.lorem.word());
        userEvent.click(await screen.findByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedErrorText)).not.toBeInTheDocument();
        });
    });
});

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