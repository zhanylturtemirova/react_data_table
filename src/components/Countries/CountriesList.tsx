import * as React from "react";
import { CountriesQuery } from "../../generated/graphql";
import DataTable from "../DataTable";

interface Props {
  data: CountriesQuery;
}

const CountryList: React.FC<Props> = ({ data }) => {
  const columns = [
    { title: "Country Code", field: "code" },
    { title: "Country Name", field: "name" },
  ];
  return (
    <DataTable
      columns={columns}
      data={data.countries}
      searchField={{ title: "Country Code", field: "code" }}
    />
  );
};
export default CountryList;
