import { gql } from "@apollo/client";

export const QUERY_COUNTRIES_LIST = gql`
  query Countries {
    countries {
      code
      name
    }
  }
`;
