// src/components/VisitorTable.tsx
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import { deleteVisitor, fetchVisitors } from '../services/api';

const VisitorTable: React.FC = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['visitors'],
        queryFn: fetchVisitors,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteVisitor(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visitors'] });
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Observations</TableCell>
                        <TableCell>Confirm Visit</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((visitor) => (
                        <TableRow key={visitor.id}>
                            <TableCell>{visitor.customer}</TableCell>
                            <TableCell>{visitor.name}</TableCell>
                            <TableCell>{visitor.email}</TableCell>
                            <TableCell>{visitor.phone}</TableCell>
                            <TableCell>{visitor.observations}</TableCell>
                            <TableCell>{visitor.confirmVisit ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEdit(visitor.id)}>
                                    <EditIcon width={30} fill='black' />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(visitor.id)}>
                                    <DeleteIcon width={30} fill='black' />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log('Edit', id);
};

export default VisitorTable;
