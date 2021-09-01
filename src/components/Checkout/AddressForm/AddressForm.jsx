import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Grid, Button, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../FormInput/FormInput';
import { commerce } from '../../../lib/commerce';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';

const AddressForm = ({ checkoutToken, next }) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');
  const methods = useForm();

  const countryList = Object.entries(countries).map(([code, name]) => ({ id: code, label: name}));
  const stateList = Object.entries(states).map(([code, name]) => ({ id: code, label: name}));
  const optionList = options.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));

  const fetchCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setCountries(countries);
    setCountry(Object.keys(countries)[0]);
  };

  const fetchStates = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setStates(subdivisions);
    setState(Object.keys(subdivisions)[0])
  };

  const fetchOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

    setOptions(options);
    setOption(options[0].id);
  };

  useEffect(() => {
    fetchCountries(checkoutToken.id)
  }, [checkoutToken.id]);

  useEffect(() => {
    if (country) fetchStates(country);
  }, [country]);

  useEffect(() => {
    if (state) fetchOptions(checkoutToken.id, country, state);
  }, [state, checkoutToken.id, country]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, country, state, option }))}>
          <Grid container spacing={3}>

            {/* Input Fields */}
            <Grid item xs={12} sm={6}>
              <FormInput name="firstName" label="First name" />
              <FormInput name="lastName" label="Last name" />
              <FormInput name="address1" label="Address" />
              <FormInput name="email" label="Email" />
              <FormInput name="city" label="city" />
              <FormInput name="zip" label="Zip / Postal code" />
            </Grid>

            {/* Select boxes */}
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

            <Grid item xs={12} sm={6}>
              <InputLabel>State</InputLabel>
              <Select value={state} fullWidth onChange={e => setState(e.target.value)}>
                {stateList.map(state => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Option</InputLabel>
              <Select value={option} fullWidth onChange={e => setOption(e.target.value)}>
                {optionList.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
            <Button type="submit" variant="contained" color="primary">Next <ArrowForwardIcon style={{ fontSize: "1.25em", margin: '0 auto' }}/></Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
