import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  
  return (
    <div>
      <Grid item xs={12} sm={6}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              required={required}
              label={label}
              fullWidth
            />
          )}
          fullWidth
          control={control}
          name={name}
        />
      </Grid>
    </div>
  );
};

export default FormInput;
