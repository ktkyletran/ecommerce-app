import React, { useState, useEffect } from 'react';
import { InputLabel, Select, Menu, MenuItem, Grid, Button, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../FormInput/FormInput';
import { commerce } from '../../../lib/commerce';

const AddressForm = ({ checkoutToken }) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const methods = useForm();

  const countryList = Object.entries(countries).map(([code, name]) => ({ id: code, label: name}));

  const fetchCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    console.log(countries)
    setCountries(countries);
    setCountry(Object.keys(countries)[0]);
  };

  useEffect(() => {
    fetchCountries(checkoutToken.id)
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={null}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="city" />
            <FormInput required name="zip" label="Zip code" />

            <Grid item xs={12} sm={6}>
              <InputLabel>Country</InputLabel>
              <Select value={country} fullWidth onChange={e => setCountry(e.target.value)}>
                {countryList.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <InputLabel>State</InputLabel>
              <Select value='' fullWidth onChange={null}>
                <MenuItem key={1} value=''>
                  Select country
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>City</InputLabel>
              <Select value='' fullWidth onChange={null}>
                <MenuItem key={1} value=''>
                  Select country
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
