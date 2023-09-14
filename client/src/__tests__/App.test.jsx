import { App } from "../App";
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("High-level tests", () => {
  test("App container renders", () => {
    render(<App />)
    const app = screen.getByTestId("app");
    expect(app).toBeVisible();
  })
})