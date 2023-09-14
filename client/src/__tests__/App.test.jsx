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

describe("User is signed out tests", () => {
  
  
  test('Being signed out displays "Sign In" button', () => {
    render(<App />)
    const signInButton = screen.getByTestId("sign-in-button");
    expect(signInButton).toBeVisible();
    
  })
  
  test('Being signed out displays module icons', () => {
    render(<App />)
    const analyticsIcon = screen.getByTestId("signed-out-analytics-icon");
    expect(analyticsIcon).toBeVisible();
    const usersIcon = screen.getByTestId("signed-out-users-icon");
    expect(usersIcon).toBeVisible();
    const formsIcon = screen.getByTestId("signed-out-forms-icon");
    expect(formsIcon).toBeVisible();
    const changelogIcon = screen.getByTestId("signed-out-changelog-icon");
    expect(changelogIcon).toBeVisible();
  })
  
  test('Being signed out displays title text', () => {
    render(<App />)
    const titleText = screen.getByTestId("signed-out-header");
    expect(titleText).toBeVisible();
  })
})