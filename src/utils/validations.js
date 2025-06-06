import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({
    name: Yup.string().required('Name is requires'),
    email: Yup.string().email('Invalid Email Id').required('Email Id is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string().required('Password is required').min(6, 'Minimum 6 characters required'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], "Password dosn't match")
});

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid Email Id').required('Email Id is required'),
    password: Yup.string().required('Password is required').min(6, 'Minimum 6 characters required'),
});

export const taskValidation = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    dueDate: Yup.string().required('Due Date is required').test('future-date', 'past date is not allowed', (value) => {
        return (new Date(value) > new Date())
    }),
    status: Yup.string().required('Status is required')
});
