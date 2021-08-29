import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  
  return (
    <div>
      <Grid item xs={12} sm={6}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <TextField {...field} required label={label} fullWidth />
          )}
        />
      </Grid>
    </div>
  );
};

export default FormInput;
