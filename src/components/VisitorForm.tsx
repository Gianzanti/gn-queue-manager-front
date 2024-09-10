import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import cadastro_beltone from '../assets/cadastro_beltone.png';
import cadastro_resound from '../assets/cadastro_resound.png';
import { createVisitor } from '../services/api';
import { validateEmail } from '../services/utils';
import { Visitor } from '../types';
import FSMessage from './Congratulations';

type VisitorFormProps = {
    customer: string;
};

function VisitorForm({ customer }: VisitorFormProps) {
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

    if (addVisitor.isSuccess) return <FSMessage customer={customer} />;

    const textColor = customer === 'Resound' ? 'black' : 'white';
    const btnColor = customer === 'Resound' ? 'red' : 'blue';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundImage:
                    customer === 'Resound'
                        ? `url(${cadastro_resound})`
                        : `url(${cadastro_beltone})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '90%',
                    // margin: '0 auto',
                    mt: 28,
                }}
                onSubmit={handleSubmit}
            >
                <Toaster />

                <TextField
                    label='Nome'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    sx={{ input: { color: textColor } }}
                />
                <TextField
                    label='Email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    variant='outlined'
                    type='email'
                    fullWidth
                    sx={{ input: { color: textColor } }}
                />
                <TextField
                    label='Telefone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    sx={{ input: { color: textColor } }}
                />
                <FormControlLabel
                    control={
                        <Checkbox name='lgpd' checked={formData.lgpd} onChange={handleChange} />
                    }
                    label={<Typography color={textColor}>Concordo com a LGPD</Typography>}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name='image_rights'
                            checked={formData.image_rights}
                            onChange={handleChange}
                        />
                    }
                    label={
                        <Typography color={textColor}>
                            Concordo com a cessão de direitos de imagem
                        </Typography>
                    }
                />
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    disabled={addVisitor.isPending}
                    sx={{ backgroundColor: btnColor }}
                >
                    {addVisitor.isPending ? 'Enviando...' : 'Enviar'}
                </Button>
                {addVisitor.isError && (
                    <Typography color='error'>Erro submetendo formulário</Typography>
                )}
            </Box>
        </Box>
    );
}

export default VisitorForm;
