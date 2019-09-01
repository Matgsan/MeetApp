import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { Container } from './styles';
import api from '~/services/api';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('organizer');
        setMeetups(
          response.data.map(meetup => {
            return {
              ...meetup,
              dateFormatted: format(
                parseISO(meetup.date),
                "d 'de' MMMM, 'às' HH:mm",
                {
                  locale: pt,
                }
              ),
            };
          })
        );
      } catch (err) {
        toast.error(
          'Ocorreu um erro ao encontrar os seus meetups. Tente mais tarde.'
        );
      }
    }
    loadMeetups();
  }, []);
  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/edit">
          <MdAddCircleOutline color="#FFF" size={22} />
          Novo meetup
        </Link>
      </header>
      <ul>
        {meetups.map(meetup => (
          <li key={meetup.id}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.dateFormatted}</span>
              <Link to={{ pathname: '/details', state: { meetup } }}>
                <MdChevronRight color="#FFF" size={24} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
