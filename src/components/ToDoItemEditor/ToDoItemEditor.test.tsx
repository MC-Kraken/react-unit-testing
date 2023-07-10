import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ToDoItemEditor } from "./ToDoItemEditor";
import faker from "@faker-js/faker";
import { toDoItemPriority } from "../../enums/toDoItemPriority";
import * as toDoService from "../../services/toDoService";
import userEvent from "@testing-library/user-event";

describe("ToDoItemEditor", () => {
    it("should allow for editing a todo item", async () => {
        const mockHandleEdit = jest.fn();
        const spy = jest.spyOn(toDoService, "editToDoItem").mockResolvedValue(new Response());
        const expectedId = faker.datatype.number();
        const today = "2000-07-04T07:00:00.000Z";
        const todayDisplayValue = "07/04/2000"

        // Arrange
        render(<ToDoItemEditor setShouldShow={jest.fn()} dueDate={today}
                               description={faker.word.verb()} id={expectedId}
                               priority={toDoItemPriority.Low} handleEdit={mockHandleEdit} />);

        // Act
        const expectedDescription = faker.lorem.word();
        userEvent.clear(screen.getByLabelText("todo-input"));
        userEvent.paste(screen.getByLabelText("todo-input"), expectedDescription);

        const dateToPaste = "04/22/1993";
        const expectedDate = new Date("1993-04-22T07:00:00.000Z");

        const dateInput =  screen.getByDisplayValue(todayDisplayValue);
        userEvent.clear(dateInput);
        userEvent.paste(dateInput, dateToPaste)

        userEvent.click(screen.getByRole("button", { name: "Low" }));
        const testPriority = "High"
        const expectedPriorityEnumValue = 2;
        userEvent.click(await screen.findByText(testPriority))

        userEvent.click(screen.getByRole("button", { name: "Update" }))

        const ops: any[] = [];
        ops.push({
            "op": "replace",
            "path": "/description",
            "value": expectedDescription
        });
        ops.push({
            "op": "replace",
            "path": "/dueDate",
            "value": expectedDate
        })
        ops.push({
            "op": "replace",
            "path": "/priority",
            "value": expectedPriorityEnumValue
        })

        // Assert
        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(ops, expectedId);
            expect(mockHandleEdit).toHaveBeenCalledTimes(1);
        });
    });
})