import React, { useMemo } from 'react';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Container, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Details({
  location: {
    state: { meetup },
  },
}) {
  async function handleDelete() {
    try {
      await api.delete(`/meetups/${meetup.id}`);
      history.push('/dashboard');
      toast.success(`O Meetup '${meetup.title}' foi deletado com sucesso.`);
    } catch (err) {
      toast.error('Ocorreu um erro ao deletar esse meetup, tente mais tarde');
    }
  }
  const dataFormatted = useMemo(
    () =>
      format(parseISO(meetup.date), "d 'de' MMMM, 'às' HH:mm", {
        locale: pt,
      }),
    [meetup.date]
  );
  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <div>
          <Link to={{ pathname: '/edit', state: { meetup } }}>
            <MdEdit />
            Editar
          </Link>
          <button type="button" onClick={handleDelete}>
            <MdDeleteForever />
            Cancelar
          </button>
        </div>
      </header>
      <Content>
        <img src={meetup.file.url} alt={meetup.title} />
        <p>{meetup.description}</p>
        <div>
          <span>
            <MdEvent />
            {dataFormatted}
          </span>
          <span>
            <MdPlace />
            {meetup.location}
          </span>
        </div>
      </Content>
    </Container>
  );
}

Details.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      meetup: PropTypes.shape(),
    }),
  }).isRequired,
};
