import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  first_name: string;
  last_name: string;
};

function SimpleForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setSubmittedData(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("first_name")}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <input
            {...register("last_name")}
            placeholder="Last Name"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <pre style={{ marginTop: 20 }}>
{`{
  first_name: ${submittedData.first_name}
  last_name: ${submittedData.last_name}
}`}
        </pre>
      )}
    </div>
  );
}

export default SimpleForm;
