import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { createVisitor } from '../services/api';
import { validateEmail } from '../services/utils';
import { Visitor } from '../types';
import FSMessage from './Congratulations';

type VisitorFormProps = {
    title: string;
    customer: string;
};

function VisitorForm({ title, customer }: VisitorFormProps) {
    const [formData, setFormData] = useState<Visitor>({
        customer,
        name: '',
        email: '',
        phone: '',
        lgpd: false,
        image_rights: false,
        confirm_visit: false,
    });

    const addVisitor = useMutation({
        mutationFn: createVisitor,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // validate name
        if (formData.name.trim() === '') {
            toast.error('Nome é obrigatório');
            return;
        }

        // validate email
        if (validateEmail(formData.email) === false) {
            toast.error('Email Inválido');
            return;
        }

        // validate phone
        if (formData.phone.trim() === '') {
            toast.error('Telefone é obrigatório');
            return;
        }

        if (!formData.lgpd) {
            toast.error('Você precisa concordar com a LGPD');
            return;
        }

        if (!formData.image_rights) {
            toast.error('Você precisa concordar com a cessão de direitos de imagem');
            return;
        }

        addVisitor.mutate(formData);
    };

    if (addVisitor.isSuccess) return <FSMessage message='A Resound agradece sua participação!' />;

    return (
        <Box
            component='form'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 600,
                margin: '0 auto',
                mt: 5,
            }}
            onSubmit={handleSubmit}
        >
            <Toaster />
            <Typography variant='h4' component='h1' align='center' gutterBottom>
                {title}
            </Typography>
            <TextField
                label='Nome'
                name='name'
                value={formData.name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
                // required
            />
            <TextField
                label='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                variant='outlined'
                type='email'
                fullWidth
                // required
            />
            <TextField
                label='Telefone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                variant='outlined'
                fullWidth
                // required
            />
            <FormControlLabel
                control={<Checkbox name='lgpd' checked={formData.lgpd} onChange={handleChange} />}
                label='Concordo com a LGPD'
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name='image_rights'
                        checked={formData.image_rights}
                        onChange={handleChange}
                    />
                }
                label='Concordo com a cessão de direitos de imagem'
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                disabled={addVisitor.isPending}
            >
                {addVisitor.isPending ? 'Enviando...' : 'Enviar'}
            </Button>
            {addVisitor.isError && (
                <Typography color='error'>Erro submetendo formulário</Typography>
            )}
        </Box>
    );
}

export default VisitorForm;
