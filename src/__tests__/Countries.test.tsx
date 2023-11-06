import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { QUERY_COUNTRIES_LIST } from "../components/Countries/query";

import Countries from "../components/Countries";

test("should render Countries component loading", async () => {
  const mockDataLoading = [
    {
      delay: Infinity,
      request: {
        query: QUERY_COUNTRIES_LIST,
        variables: {},
      },
      result: {
        data: {
          countries: [
            {
              code: "AD",
              name: "Andorra",
            },
            {
              code: "AE",
              name: "United Arab Emirates",
            },
          ],
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={mockDataLoading} addTypename={false}>
      <Countries />
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
});

test("should render Countries component", async () => {
  const successMockData = [
    {
      request: {
        query: QUERY_COUNTRIES_LIST,
        variables: {},
      },
      result: {
        data: {
          countries: [
            {
              code: "AD",
              name: "Andorra",
            },
            {
              code: "AE",
              name: "United Arab Emirates",
            },
          ],
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={successMockData} addTypename={false}>
      <Countries />
    </MockedProvider>
  );
  expect(await screen.findByText("Andorra")).toBeInTheDocument();
  expect(await screen.findByText("United Arab Emirates")).toBeInTheDocument();
});
test("should render Countries component with empty list", async () => {
  const successMockData = [
    {
      request: {
        query: QUERY_COUNTRIES_LIST,
        variables: {},
      },
      result: {
        data: {},
      },
    },
  ];
  render(
    <MockedProvider mocks={successMockData} addTypename={false}>
      <Countries />
    </MockedProvider>
  );
  expect(await screen.findByText("No Countries")).toBeInTheDocument();
});

test("should render Countries component with error", async () => {
  const successMockData = [
    {
      request: {
        query: QUERY_COUNTRIES_LIST,
        variables: {},
      },
      error: new Error("An error occurred"),
    },
  ];
  render(
    <MockedProvider mocks={successMockData} addTypename={false}>
      <Countries />
    </MockedProvider>
  );
  expect(await screen.findByText("An error occurred")).toBeInTheDocument();
});
