import CountriesList from "./CountriesList";
import { useQuery } from "@apollo/client";
import { QUERY_COUNTRIES_LIST } from "./query";

const CountriesListContainer = () => {
  const { data, error, loading } = useQuery(QUERY_COUNTRIES_LIST, {
    fetchPolicy: "cache-first",
  });
  if (loading) return "Loading...";
  if (error) return `${error.message}`;
  if (!data?.countries) {
    return <div>No Countries</div>;
  }
  return <CountriesList data={data} />;
};

export default CountriesListContainer;
