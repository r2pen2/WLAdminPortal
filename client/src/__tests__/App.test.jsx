import { App } from "../App";
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { User } from "../libraries/Web-Legos/api/auth";
import { AvailableSite, SiteModule } from "../libraries/Web-Legos/api/admin.ts";

describe("User is signed out tests", () => {
  
  test('Being signed out displays signed out page', () => {
    render(<App />)
    const signedOutPage = screen.getByTestId("signed-out-page");
    expect(signedOutPage).toBeVisible();
  })

  test('Being signed out displays "Sign In" button', () => {
    render(<App />)
    const signInButton = screen.getByTestId("sign-in-button");
    expect(signInButton).toBeVisible();
  })

  test('Being signed out hides "Sign Out" button', () => {
    render(<App />)
    const signOutButton = screen.queryByTestId("sign-out-button");
    expect(signOutButton).not.toBeInTheDocument();
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

describe("User is signed in without sites tests", () => {

  test("Being signed in without any sites displays support message", () => {
    render(<App testUser={User.examples.default}/>)
    const noSitesPage = screen.getByTestId("signed-in-no-sites-page");
    expect(noSitesPage).toBeVisible()
    const soSitesFrownyFace = screen.getByTestId("signed-in-no-sites-glyph");
    expect(soSitesFrownyFace).toBeVisible()
  })
  
  test('Being signed in without any sites  displays "Sign Out" button', () => {
    render(<App testUser={User.examples.default}/>)
    const signOutButton = screen.getByTestId("sign-out-button");
    expect(signOutButton).toBeVisible();
  })

  test('Being signed in without any sites  hides "Sign In" button', () => {
    render(<App testUser={User.examples.default}/>)
    const signInButton = screen.queryByTestId("sign-in-button");
    expect(signInButton).not.toBeInTheDocument()
  })
})

describe("User is signed successfully tests", () => {

  test("Being signed displays bottom navigation", () => {
    render(<App testUser={User.examples.default} testSites={[AvailableSite.examples.default]}/>)
    const bottomNavigator = screen.getByTestId("bottom-nav");
    expect(bottomNavigator).toBeVisible()
  })

  test("Being signed displays tab container", () => {
    render(<App testUser={User.examples.default} testSites={[AvailableSite.examples.default]}/>)
    const signedInTabContainer = screen.getByTestId("signed-in-tab-container");
    expect(signedInTabContainer).toBeVisible()
  })

  test("Signing in defaults to HOME tab", () => {
    render(<App testUser={User.examples.default} testSites={[AvailableSite.examples.default]}/>)
    const homeTabContainer = screen.getByTestId("home-tab-container");
    expect(homeTabContainer).toBeVisible()
  })
})

describe("Navigation tests", () => {

  test("Bottom navigation buttons change tabs as intended", () => {
    render(<App testUser={User.examples.default} testSites={[AvailableSite.examples.default]}/>)
    // First make sure the navigator exists at all
    const bottomNavigator = screen.getByTestId("bottom-nav");
    expect(bottomNavigator).toBeVisible()

    // We should be starting out on the homepage
    const homeTabContainer = screen.getByTestId("home-tab-container");
    expect(homeTabContainer).toBeVisible()

    // Try clicking each of the items and seeing if the tab changes
    const analyticsButton = screen.getByTestId(`bottom-nav-button-${SiteModule.analytics}`)
    expect(analyticsButton).toBeVisible()
    fireEvent.click(analyticsButton)

    // Ideally we're not on the homepage anymore
    expect(homeTabContainer).not.toBeInTheDocument()
    const analyticsTabContainer = screen.getByTestId("analytics-tab-container");
    expect(analyticsTabContainer).toBeInTheDocument()
    
    // Click forms
    const formsButton = screen.getByTestId(`bottom-nav-button-${SiteModule.forms}`)
    fireEvent.click(formsButton)
    expect(analyticsTabContainer).not.toBeInTheDocument()
    const formsTabContainer = screen.getByTestId("forms-tab-container");
    expect(formsTabContainer).toBeInTheDocument()
    
    // Click changelog
    const changelogButton = screen.getByTestId(`bottom-nav-button-${SiteModule.log}`)
    fireEvent.click(changelogButton)
    expect(formsTabContainer).not.toBeInTheDocument()
    const changelogTabContainer = screen.getByTestId("log-tab-container");
    expect(changelogTabContainer).toBeInTheDocument()
    
    // Click users
    const usersButton = screen.getByTestId(`bottom-nav-button-${SiteModule.users}`)
    fireEvent.click(usersButton)
    expect(changelogTabContainer).not.toBeInTheDocument()
    const usersTabContainer = screen.getByTestId("users-tab-container");
    expect(usersTabContainer).toBeInTheDocument()
  })
})