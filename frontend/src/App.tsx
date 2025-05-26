import "./App.css"
import EmployeeTable from "./components/EmployeeTable";
import Form from "./components/Form";
import { useEmployeeFindAllQuery } from "./generated/graphql";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:3000/graphql");

export default function App() {

  const { data, isLoading, error, refetch } = useEmployeeFindAllQuery(client);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className="App">
      <Form onSuccess={refetch} api={client}/>
      <EmployeeTable data={data?.EmployeeFindAll ?? []} onSuccess={refetch} api={client} />
    </div>
  );
}
