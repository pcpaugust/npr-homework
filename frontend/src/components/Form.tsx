import { TextField, Select, MenuItem, Button, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEmployeeCreateMutation, Gender } from "../generated/graphql";
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
  first_name: string;
  last_name: string;
  gender: string;
  salary: number;
  description?: string;
};

type Props = {
  onSuccess?: () => void;
  api: GraphQLClient;
};

  export default function Form({ onSuccess, api }: Props) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useEmployeeCreateMutation(api);

  const handleCreate = async (formData: FormData) => {
    console.log('Form data:', formData);
    const transformed = {
      ...formData,
      gender: formData.gender.toUpperCase() as Gender,
      salary: Number(formData.salary),
    };
    mutation.mutate(
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
  };

  return (
    <div style={{ width: 400, margin: '0 auto', padding: 20 }}>
      <form onSubmit={handleSubmit(handleCreate)} style={{ marginBottom: 32 }}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          {...register("first_name")}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
          {...register("last_name")}
        />
        <FormControl fullWidth margin="normal" error={!!errors.gender}>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            defaultValue=""
            {...register("gender")}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </Select>
          <FormHelperText>{errors.gender?.message}</FormHelperText>
        </FormControl>
        <TextField
          label="Salary"
          type="number"
          fullWidth
          margin="normal"
          error={!!errors.salary}
          helperText={errors.salary?.message}
          {...register("salary")}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register("description")}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};
