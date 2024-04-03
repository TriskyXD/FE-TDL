import { render, screen, fireEvent } from "@testing-library/react";
import Tasks from "../pages/tasks/Tasks";

test("Vytvoření tasku bez zadani hodnot do formu", () => {
    render(<Tasks />);

    fireEvent.click(screen.getByText("Vytvořit nový úkol"));

    fireEvent.click(screen.getByText("Uložit změny"));


    expect(screen.queryByText("Error")).toBeNull();
});
