import * as React from "react";
import { CountriesQuery } from "../../generated/graphql";
import "./styles.scss";
import DataTable from "../DataTable";

interface Props {
  data: CountriesQuery;
}

const className = "DataTable";

const CountryList: React.FC<Props> = ({ data }) => {
  const columns = [
    { title: "Country Code", field: "code" },
    { title: "Country Name", field: "name" },
  ];
  return (
    <div className={className}>
      <DataTable
        columns={columns}
        data={data.countries}
        searchField={{ title: "Country Code", field: "code" }}
      />
    </div>
  );
};
export default CountryList;
