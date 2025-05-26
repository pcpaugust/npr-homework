import { useEffect } from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEmployeeCreateMutation, Gender, useEmployeeUpdateMutation, Employee } from "../generated/graphql";
import { GraphQLClient } from 'graphql-request';

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  gender: yup.string().required('Gender is required'),
  salary: yup
    .number()
    .typeError('Salary must be a number')
    .min(0, 'Salary must be at least 0')
    .required('Salary is required'),
  description: yup
    .string()
    .max(100, 'Description must be at most 100 characters'),
});

type FormData = {
  id?: number; // Optional for create mode
  first_name: string;
  last_name: string;
  gender: string;
  salary: number;
  description?: string;
};

type Props = {
  onSuccess?: () => void;
  api: GraphQLClient;
  mode?: 'create' | 'update';
  initialValues?: Employee | null;
};


export default function Form({ onSuccess, api ,mode = 'create', initialValues}: Props) {

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createMutation = useEmployeeCreateMutation(api);
  const updateMutation = useEmployeeUpdateMutation(api);

  console.log("Form mode:", mode);
  console.log("Initial values:", initialValues);

  useEffect(() => {
    if (mode === 'update' && initialValues) {
      reset({
        ...initialValues,
        gender: initialValues?.gender ?? 'none',
        description: initialValues?.description ?? "",
      });
    }
    else {
      reset({
        first_name: '',
        last_name: '',
        gender: 'none',
        salary: 0,
        description: '',
      });
    }
  }, [initialValues, mode, reset]);

  const onSubmit = (formData: FormData) => {

    const transformed = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      gender: formData.gender.toUpperCase() as Gender,
      salary: Number(formData.salary),
      description: formData.description?.trim() || undefined
    };

    console.log("Transformed data:", transformed);

    if (mode === 'create') {
      createMutation.mutate(
        { data: transformed },
        {
          onSuccess: () => {
            reset();
            onSuccess?.();
          },
          onError: (err: any) => {
            console.log(`Create failed: ${err.message}`);
          },
        }
      );
    } else if (mode === 'update' && formData?.id) {
      console.log("Updating employee with data:", transformed);
      console.log("Form data ID:", formData.id);
      updateMutation.mutate(
        { id: formData.id, data: transformed },
        {
          onSuccess: () => {
            console.log("Update successful");
            reset(
              {
                first_name: '',
                last_name: '',
                gender: '',
                salary: 0,
                description: '',
              }
            );
            onSuccess?.();
          },
          onError: (err: any) => {
            console.log(`Update failed: ${err.message}`);
          },
        }
      );
    }
  };


  return (
    <div style={{ width: 400, margin: '0 auto', padding: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 32 }}>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        <FormControl fullWidth margin="normal" error={!!errors.gender}>
          <InputLabel shrink>Gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                label="Gender"
                value={field.value}
                onChange={field.onChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.gender?.message}</FormHelperText>
        </FormControl>
        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <TextField
              label="Salary"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.salary}
              helperText={errors.salary?.message}
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          {mode === 'create' ? 'Submit' : 'Update'}
        </Button>
      </form>
    </div>
  );
};
