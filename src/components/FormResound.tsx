import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { insertVisitor } from '../services/api';
import { Visitor } from '../types';

function FormResound() {
    const [formData, setFormData] = useState<Visitor>({
        customer: 'Resound',
        name: '',
        email: '',
        phone: '',
        lgpd: false,
        image_rights: false,
    });

    const addVisitor = useMutation({
        mutationFn: insertVisitor,
    });

    //     saveFormData, {
    //     onSuccess: () => {
    //         // Handle success (e.g., show a success message, reset the form, etc.)
    //         console.log('Form data saved successfully');
    //     },
    //     onError: (error: any) => {
    //         // Handle error (e.g., show an error message)
    //         console.error('Error saving form data', error);
    //     },
    // });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        addVisitor.mutate(formData);
    };

    return (
        <Box
            component='form'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 300,
                margin: '0 auto',
                mt: 5,
            }}
            onSubmit={handleSubmit}
        >
            <Typography variant='h4' component='h1' align='center' gutterBottom>
                Simple Form
            </Typography>
            <TextField
                label='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
                required
            />
            <TextField
                label='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                variant='outlined'
                type='email'
                fullWidth
                required
            />
            <TextField
                label='Phone Number'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                variant='outlined'
                fullWidth
                required
            />
            <FormControlLabel
                control={
                    <Checkbox name='option1' checked={formData.lgpd} onChange={handleChange} />
                }
                label='Option 1'
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name='option2'
                        checked={formData.image_rights}
                        onChange={handleChange}
                    />
                }
                label='Option 2'
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                disabled={addVisitor.isPending}
            >
                {addVisitor.isPending ? 'Submitting...' : 'Submit'}
            </Button>
            {addVisitor.isError && <Typography color='error'>Error submitting the form</Typography>}
            {addVisitor.isSuccess && (
                <Typography color='primary'>Form submitted successfully!</Typography>
            )}
        </Box>
    );
}

export default FormResound;
