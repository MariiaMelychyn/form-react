import React from 'react';
import { MainContainer } from './components/MainContainer';
import Typography from '@material-ui/core/Typography';
import { Form } from './components/Form';
import { useForm } from 'react-hook-form';
import { useData } from './DataContext';
import { useHistory } from 'react-router-dom';
import { PrimaryButton } from './components/PrimaryButton';
import { FileInput } from './components/FileInput';

export const Step3 = () => {
  const history = useHistory();
  const { data, setValues } = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });

  const onSubmit = data => {
    history.push('./result');
    setValues(data);
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control} />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};