import { App, CurrentSiteContext, CurrentUserContext, TestingContext } from "../App";
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { User } from "../libraries/Web-Legos/api/auth";
import { AvailableSite, SiteModule } from "../libraries/Web-Legos/api/admin.ts";
import { useState } from "react";
import SiteUsers from "../tabs/SiteUsers";


describe("SiteUsers table display tests", () => {

  test("SiteUsers table displays table header correctly", () => {
    render(
      <App testUser={User.examples.default} testSites={[AvailableSite.examples.default]}>
        <SiteUsers siteUsers={[User.examples.default, User.examples.owner]} testPermission={true}/>
      </App>
    )
    const tableHeader = screen.getByTestId("site-users-table-header")
    expect(tableHeader).toBeVisible()
  })

})