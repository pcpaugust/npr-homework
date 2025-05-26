import { useState, useEffect } from 'react';
import {  
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, IconButton
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  DragDropContext, Droppable, Draggable
} from '@hello-pangea/dnd';

import { Employee, useEmployeeRemoveMutation } from "../generated/graphql";
import { GraphQLClient } from 'graphql-request';

type Props = {
  data: Employee[];
  onSuccess?: () => void;
  api: GraphQLClient;
};

function EmployeeTable({ data, onSuccess, api } : Props) {
    const mutation = useEmployeeRemoveMutation(api);
    const [tableData, setData] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setData(data || []);
    }, [data]);


    const handleRemove = async (id: number) => {
        console.log("Removing employee with ID:", id);
        mutation.mutate({ id }, {
        onSuccess: () => {
            onSuccess?.();
        },
        onError: (err: any) => {
            console.log(`Delete failed: ${err.message}`);
        },
        });
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = tableData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );


    return (
        <div style={{ padding: 20 }}>
            <TableContainer component={Paper}>
            <DragDropContext
                onDragEnd={(result) => {
                const { source, destination } = result;
                if (!destination) return;

                const currentIndex = page * rowsPerPage + source.index;
                const newIndex = page * rowsPerPage + destination.index;

                const updatedData = [...data];
                const [movedRow] = updatedData.splice(currentIndex, 1);
                updatedData.splice(newIndex, 0, movedRow);

                setData(updatedData);
                }}
            >
                <Droppable droppableId="table-body">
                {(provided) => (
                    <Table {...provided.droppableProps} ref={provided.innerRef} 
                    sx={{ minWidth: 650, border: '1px solid #ccc', borderRadius: 2 }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                        <TableCell sx={{ width: 50}}></TableCell>
                        <TableCell align="center" sx={{ width: 30 , fontWeight: 'bold' , fontSize: '1rem'}}>No.</TableCell>
                        <TableCell align="center" sx={{ width: 125 , fontWeight: 'bold' , fontSize: '1rem'}}>First Name</TableCell>
                        <TableCell align="center" sx={{ width: 125 , fontWeight: 'bold' , fontSize: '1rem'}}>Last Name</TableCell>
                        <TableCell align="center" sx={{ width: 75 , fontWeight: 'bold' , fontSize: '1rem'}}>Gender</TableCell>
                        <TableCell align="center" sx={{ width: 100 , fontWeight: 'bold' , fontSize: '1rem'}}>Salary</TableCell>
                        <TableCell align="center" sx={{ width: 150 , fontWeight: 'bold' , fontSize: '1rem'}}>Description</TableCell>
                        <TableCell align="center" sx={{ width: 100 , fontWeight: 'bold' , fontSize: '1rem'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => {
                        const globalIndex = page * rowsPerPage + index;
                        return (
                            <Draggable
                            key={`row-${globalIndex}`}
                            draggableId={`row-${globalIndex}`}
                            index={index}
                            >
                            {(provided, snapshot) => (
                                <TableRow
                                key={globalIndex+1}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{
                                    ...provided.draggableProps.style,
                                    backgroundColor: snapshot.isDragging ? '#f4f4f4' : 'white',
                                }}
                                >
                                <TableCell>
                                    <IconButton {...provided.dragHandleProps}>
                                    <DragIndicatorIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align='center'>{globalIndex + 1}</TableCell>
                                <TableCell align='center'>{row.first_name}</TableCell>
                                <TableCell align='center'>{row.last_name}</TableCell>
                                <TableCell align='center'>{row.gender}</TableCell>
                                <TableCell align='center'>{row.salary}</TableCell>
                                <TableCell align='center'>{row.description}</TableCell>
                                <TableCell align='center'>
                                    <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        handleRemove(row.id);
                                    }}
                                    >
                                    Delete
                                    </Button>
                                </TableCell>
                                </TableRow>
                            )}
                            </Draggable>
                        );
                        })}
                        {provided.placeholder}
                    </TableBody>
                    </Table>
                )}
                </Droppable>
            </DragDropContext>

            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </TableContainer>
        </div>
    );
}

export default EmployeeTable;