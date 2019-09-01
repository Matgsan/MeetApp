import React from 'react';
import PropTypes from 'prop-types';
import Detail from './components/Detail';
import { Container, Content, Banner, Title, ActionButton } from './styles';

export default function MeetupCard({ meetup, loading, subscribed, onPress }) {
  return (
    <Container>
      <Banner source={{ uri: meetup.file.url }} />
      <Content>
        <Title>{meetup.title}</Title>
        <Detail icon="event">{meetup.dateFormatted}</Detail>
        <Detail icon="place">{meetup.location}</Detail>
        <Detail icon="person">Organizador: {meetup.user.name}</Detail>
        <ActionButton
          loading={loading}
          subscribed={subscribed}
          onPress={onPress}
        >
          {subscribed ? 'Cancelar inscrição' : 'Realizar inscrição'}
        </ActionButton>
      </Content>
    </Container>
  );
}
MeetupCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  subscribed: PropTypes.bool,
  loading: PropTypes.bool,
  meetup: PropTypes.shape({
    title: PropTypes.string,
    dateFormatted: PropTypes.string,
    location: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    file: PropTypes.shape({
      url: PropTypes.string,
    }),
    id: PropTypes.number,
  }).isRequired,
};

MeetupCard.defaultProps = {
  subscribed: false,
  loading: false,
};
