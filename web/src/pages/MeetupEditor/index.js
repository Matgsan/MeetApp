import React, { useMemo } from 'react';
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
      <Form initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="file" />
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
