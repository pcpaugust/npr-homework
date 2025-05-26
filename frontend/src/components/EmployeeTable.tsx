import { useState, useEffect } from 'react';
import {  
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, IconButton
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  DragDropContext, Droppable, Draggable
} from '@hello-pangea/dnd';

import { Employee, PaginationMetadata, useEmployeeRemoveMutation } from "../generated/graphql";
import { GraphQLClient } from 'graphql-request';
import { set } from 'react-hook-form';

type Props = {
  data: Employee[];
  meta: PaginationMetadata;
  onSuccess?: () => void;
  api: GraphQLClient;
  onRowClick?: (id: number) => void;
  paginated: (page: number, pageSize: number) => void;
};

function EmployeeTable({ data, onSuccess, api, onRowClick, paginated, meta } : Props) {
    const mutation = useEmployeeRemoveMutation(api);
    const [page, setPage] = useState(meta.page - 1);
    const [rowsPerPage, setRowsPerPage] = useState(meta.pageSize);

    const handleClick = (event: React.MouseEvent<HTMLTableRowElement>, row: Employee) => {
        if (onRowClick) {
            onRowClick(row.id);
        }
    };

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
    };

    useEffect(() => {
        paginated(page, rowsPerPage);
    }, [page, rowsPerPage, paginated]);

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
                        {data.map((row, index) => {
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
                                onClick={(event) => handleClick(event, row)}
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
                                    onClick={(e) => {
                                        e.stopPropagation();
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
                count={meta.totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />
            </TableContainer>
        </div>
    );
}

export default EmployeeTable;