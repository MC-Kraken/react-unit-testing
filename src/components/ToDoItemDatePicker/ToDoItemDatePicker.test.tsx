import { render, screen } from "@testing-library/react";
import { ToDoItemDatePicker } from "./ToDoItemDatePicker";

describe("ToDoItemDatePicker", () => {
    it("should display", async () => {
        // Arrange
        render(<ToDoItemDatePicker setNewToDoItemDate={jest.fn()} selectedDate={new Date()} />);

        // Act
        let datePicker = screen.getByPlaceholderText("Choose a due date");

        // Assert
        expect(datePicker).toBeInTheDocument();
    });
})