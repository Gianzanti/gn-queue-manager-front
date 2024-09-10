// src/components/VisitorTable.tsx
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import MarkerIcon from '../components/icons/MarkerIcon';
import { createVisitor, deleteVisitor, fetchVisitors, updateVisitor } from '../services/api';
import { Visitor } from '../types';

const VisitorTable: React.FC = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVisitor, setCurrentVisitor] = useState<Visitor | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['visitors'],
        queryFn: fetchVisitors,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteVisitor(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visitors'] });
            toast.success('Visitante deletado com sucesso');
        },
        onError: () => {
            toast.error('Erro ao deletar visitante');
        },
    });

    const createMutation = useMutation({
        mutationFn: createVisitor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visitors'] });
            toast.success('Visitante criado com sucesso');
        },
        onError: () => {
            toast.error('Erro ao criar visitante');
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateVisitor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visitors'] });
            toast.success('Visitante atualizado com sucesso');
        },
        onError: () => {
            toast.error('Erro ao atualizar visitante');
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    const handleEdit = (visitor: Visitor) => {
        setCurrentVisitor(visitor);
        setIsEditing(true);
        setOpen(true);
    };

    const handleCreate = () => {
        setCurrentVisitor(null);
        setIsEditing(false);
        setOpen(true);
    };

    const handleSave = () => {
        if (currentVisitor) {
            if (isEditing) {
                updateMutation.mutate(currentVisitor);
            } else {
                createMutation.mutate(currentVisitor);
            }
        }
        setOpen(false);
    };

    const toogleVisit = (visitor: Visitor) => {
        updateMutation.mutate({ ...visitor, confirm_visit: !visitor.confirm_visit });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentVisitor) {
            setCurrentVisitor({ ...currentVisitor, [e.target.name]: e.target.value });
        } else {
            setCurrentVisitor({ ...currentVisitor!, [e.target.name]: e.target.value });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentVisitor) {
            setCurrentVisitor({ ...currentVisitor, [e.target.name]: e.target.checked });
        }
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        if (currentVisitor) {
            setCurrentVisitor({
                ...currentVisitor,
                [e.target.name as string]: e.target.value as string,
            });
        } else {
            setCurrentVisitor({
                ...currentVisitor!,
                [e.target.name as string]: e.target.value as string,
            });
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'customer',
            headerName: 'Empresa',
            minWidth: 100,
            sortingOrder: ['desc', 'asc'],
        },
        { field: 'name', headerName: 'Nome', minWidth: 200 },
        { field: 'email', headerName: 'Email', minWidth: 200 },
        { field: 'phone', headerName: 'Telefone', minWidth: 150 },
        { field: 'state', headerName: 'Estado', minWidth: 150 },
        { field: 'job', headerName: 'Profissão', minWidth: 150 },
        {
            field: 'created_at',
            headerName: 'Criação',
            minWidth: 250,
            valueFormatter: (value: string) => {
                return value ? dayjs(value).format('DD/MM/YYYY HH:mm:ss') : '';
            },
        },
        { field: 'observations', headerName: 'Observações', flex: 0.3, minWidth: 300 },
        { field: 'confirm_visit', headerName: 'Confirmado ?', width: 120, type: 'boolean' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <>
                    <IconButton onClick={() => toogleVisit(params.row)}>
                        <MarkerIcon width={25} fill='blue' />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <EditIcon width={25} fill='black' />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon width={25} fill='red' />
                    </IconButton>
                </>
            ),
        },
    ];

    if (isLoading) return <div>Carregando dados...</div>;

    if (isError) return <div>Erro ao carregar dados!</div>;

    return (
        <>
            <Toaster />
            <Button variant='contained' color='primary' onClick={handleCreate} sx={{ m: 2 }}>
                Adicionar Visitante
            </Button>
            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={data || []}
                    columns={columns}
                    onCellDoubleClick={(params) => toogleVisit(params.row as Visitor)}
                    slots={{ toolbar: GridToolbar }}
                />
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{isEditing ? 'Edit Visitor' : 'Add Visitor'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='Cliente'
                        name='customer'
                        value={currentVisitor?.customer || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        label='Nome'
                        name='name'
                        value={currentVisitor?.name || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        label='Email'
                        name='email'
                        value={currentVisitor?.email || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        label='Telefone'
                        name='phone'
                        value={currentVisitor?.phone || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControl fullWidth margin='dense'>
                        <InputLabel id='state_label'>Estado</InputLabel>
                        <Select
                            labelId='state_label'
                            id='demo-select-small'
                            label='Estado'
                            name='state'
                            value={currentVisitor?.state || ''}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={'AC'}>Acre</MenuItem>
                            <MenuItem value={'AL'}>Alagoas</MenuItem>
                            <MenuItem value={'AP'}>Amapá</MenuItem>
                            <MenuItem value={'AM'}>Amazonas</MenuItem>
                            <MenuItem value={'BA'}>Bahia</MenuItem>
                            <MenuItem value={'CE'}>Ceará</MenuItem>
                            <MenuItem value={'DF'}>Distrito Federal</MenuItem>
                            <MenuItem value={'ES'}>Espírito Santo</MenuItem>
                            <MenuItem value={'GO'}>Goiás</MenuItem>
                            <MenuItem value={'MA'}>Maranhão</MenuItem>
                            <MenuItem value={'MT'}>Mato Grosso</MenuItem>
                            <MenuItem value={'MS'}>Mato Grosso do Sul</MenuItem>
                            <MenuItem value={'MG'}>Minas Gerais</MenuItem>
                            <MenuItem value={'PA'}>Pará</MenuItem>
                            <MenuItem value={'PB'}>Paraíba</MenuItem>
                            <MenuItem value={'PR'}>Paraná</MenuItem>
                            <MenuItem value={'PE'}>Pernambuco</MenuItem>
                            <MenuItem value={'PI'}>Piauí</MenuItem>
                            <MenuItem value={'RJ'}>Rio de Janeiro</MenuItem>
                            <MenuItem value={'RN'}>Rio Grande do Norte</MenuItem>
                            <MenuItem value={'RS'}>Rio Grande do Sul</MenuItem>
                            <MenuItem value={'RO'}>Rondônia</MenuItem>
                            <MenuItem value={'RR'}>Roraima</MenuItem>
                            <MenuItem value={'SC'}>Santa Catarina</MenuItem>
                            <MenuItem value={'SP'}>São Paulo</MenuItem>
                            <MenuItem value={'SE'}>Sergipe</MenuItem>
                            <MenuItem value={'TO'}>Tocantins</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin='dense'>
                        <InputLabel id='job_label'>Profissão</InputLabel>
                        <Select
                            labelId='job_label'
                            id='demo-job-select-small'
                            label='Profissão'
                            name='job'
                            value={currentVisitor?.job || ''}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={'FGO'}>Fonoaudiólogo</MenuItem>
                            <MenuItem value={'ORL'}>Otorrino</MenuItem>
                            <MenuItem value={'EXP'}>Expositor</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentVisitor?.lgpd || false}
                                onChange={handleCheckboxChange}
                                name='acceptTerms'
                            />
                        }
                        label='Accept Terms'
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentVisitor?.image_rights || false}
                                onChange={handleCheckboxChange}
                                name='image_rights'
                            />
                        }
                        label='Image Rights'
                    />
                    <TextField
                        margin='dense'
                        label='Observações'
                        name='observations'
                        value={currentVisitor?.observations || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentVisitor?.confirm_visit || false}
                                onChange={handleCheckboxChange}
                                name='confirm_visit'
                            />
                        }
                        label='Confirm Visit'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color='primary'>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color='primary'>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VisitorTable;
