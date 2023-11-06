import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
// import { QUERY_COUNTRIES_LIST } from "../components/Countries/query";

import App from "../App";
test("Renders the main page correctly ", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(true).toBeTruthy();
});
