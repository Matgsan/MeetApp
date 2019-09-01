import React, { useMemo } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';
import BannerInput from './components/BannerInput';
import DatePickerInput from './components/DatePickerInput';

import { Container, ButtonContainer } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function MeetupEditor({ location }) {
  const meetup =
    location.state && location.state.meetup ? location.state.meetup : undefined;

  const meetupDate = useMemo(() => {
    if (meetup && meetup.date) {
      return parseISO(meetup.date);
    }
    return null;
  }, [meetup]);

  const schema = Yup.object().shape({
    title: Yup.string().required('Titulo é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    location: Yup.string().required('Localização é obrigatória'),
    date: Yup.date()
      .required('Data é obrigatória')
      .min(new Date().toISOString(), 'Data não pode ser uma data passada'),
    file_id: Yup.number().required('Arquivo é obrigatório'),
  });

  async function handleSubmit(data) {
    try {
      if (meetup) {
        const response = await api.put(`meetups/${meetup.id}`, data);
        history.push({
          pathname: '/details',
          state: { meetup: response.data },
        });
        toast.success(
          `O Meetup '${response.data.title}' foi editado com sucesso.`
        );
      } else {
        await api.post('meetups', data);
        toast.success(`O Meetup '${data.title}' foi criado com sucesso.`);
        history.push('/dashboard');
      }
    } catch (err) {
      toast.error(
        'Ocorreu um erro ao criar/editar o seu Meetup, verifique as informações'
      );
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="title" placeholder="Titulo do Meetup" />
        <Input name="description" multiline placeholder="Descrição completa" />
        <DatePickerInput name="date" defaultValue={meetupDate} />
        <Input name="location" placeholder="Localização" />
        <ButtonContainer>
          <button type="submit">
            <MdAddCircleOutline color="#FFF" size={22} />
            Salvar meetup
          </button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

MeetupEditor.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      meetup: PropTypes.shape(),
    }),
  }).isRequired,
};
