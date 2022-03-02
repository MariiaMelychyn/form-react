import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MainContainer } from './components/MainContainer';
import Typography from '@material-ui/core/Typography';
import { Form } from './components/Form';
import { Input } from './components/Input';
import { PrimaryButton } from './components/PrimaryButton';
import { useData } from './DataContext';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import parsePhoneNumberFromString from 'libphonenumber-js';

const normalizePhoneNumber = value => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }
  return phoneNumber.formatInternational();
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email is a required field'),
});

export const Step2 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const hasPhone = watch('hasPhone');

  const onSubmit = data => {
    history.push('./step3');
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="email"
          label="Email"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              color="primary"
              inputRef={register}
              name="hasPhone"
            />
          }
          label="Do you have a phone?"
        />

        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            onChange={event => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
