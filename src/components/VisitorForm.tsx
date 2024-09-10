import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
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
        state: '',
        job: '',
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

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData({
            ...formData,
            [e.target.name as string]: e.target.value as string,
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
    const btnColor = customer === 'Resound' ? '#AF1023' : 'blue';

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
                    size='small'
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
                    size='small'
                />
                <TextField
                    label='Telefone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    sx={{ input: { color: textColor } }}
                    size='small'
                />
                <FormControl sx={{ mt: 1, minWidth: 120 }} size='small'>
                    <InputLabel id='state_label'>Estado</InputLabel>
                    <Select
                        labelId='state_label'
                        id='demo-select-small'
                        label='Estado'
                        name='state'
                        value={formData?.state || ''}
                        onChange={handleSelectChange}
                        sx={{ color: textColor }}
                    >
                        <MenuItem value={''}>Não informado</MenuItem>
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
                <FormControl sx={{ mt: 1, minWidth: 120 }} size='small'>
                    <InputLabel id='job_label'>Profissão</InputLabel>
                    <Select
                        labelId='job_label'
                        id='demo-job-select-small'
                        label='Profissão'
                        name='job'
                        value={formData?.job || ''}
                        onChange={handleSelectChange}
                        sx={{ color: textColor, borderColor: textColor }}
                    >
                        <MenuItem value={''}>Não informado</MenuItem>
                        <MenuItem value={'FGO'}>Fonoaudiólogo</MenuItem>
                        <MenuItem value={'ORL'}>Otorrino</MenuItem>
                        <MenuItem value={'EXP'}>Expositor</MenuItem>
                    </Select>
                </FormControl>
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
