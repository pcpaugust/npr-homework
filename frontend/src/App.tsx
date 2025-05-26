import "./App.css"
import EmployeeTable from "./components/EmployeeTable";
import Form from "./components/Form";
import { PaginationInput, useEmployeeFindAllQuery, useEmployeeFindAllWithPaginationQuery, useEmployeeFindOneQuery } from "./generated/graphql";
import { useState } from "react";

import { GraphQLClient } from "graphql-request";
const client = new GraphQLClient("http://localhost:3000/graphql");

export default function App() {

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // const { data, isLoading, error, refetch } = useEmployeeFindAllQuery(client);
  const { data: selectedEmployeeData } = useEmployeeFindOneQuery(client, {
    id: selectedId!,
  }, {
    enabled: !!selectedId // only fetch when ID is set
  });
  
  const { data, isLoading, error, refetch } = useEmployeeFindAllWithPaginationQuery(client, {
      pagination: {
        page: page + 1,
        pageSize: rowsPerPage,
      } as PaginationInput
    }, 
    {
      enabled: !!page || !!rowsPerPage, 
    }
  );

  const useEmployeePaginated = (page: number, pageSize: number) => {
    setPage(page);
    setRowsPerPage(pageSize);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  console.log("All Employees Data:", data?.EmployeeFindAllWithPagination);

  return (
    <div className="App">
      <Form 
        onSuccess={() => {
        // refetch or update employees list
          refetch();
          setSelectedId(null);
        }} 
        api={client} 
        mode={selectedEmployeeData ? 'update' : 'create'} 
        initialValues={selectedEmployeeData?.EmployeeFindOne}/>
      <EmployeeTable 
        data={data?.EmployeeFindAllWithPagination.items || []}
        meta={data?.EmployeeFindAllWithPagination.meta || { totalItems: 0, totalPages: 1, page: 1, pageSize: 5 }}
        onSuccess={refetch} 
        api={client} 
        onRowClick={(id) => setSelectedId(id)} 
        paginated={useEmployeePaginated} />

    </div>
  );
}
