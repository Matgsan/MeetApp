import React from 'react';
import Detail from './components/Detail';
import { Container, Content, Banner, Title, ActionButton } from './styles';

export default function MeetupCard({ meetup, subscribed, onPress }) {
  return (
    <Container>
      <Banner source={{ uri: meetup.file.url }} />
      <Content>
        <Title>{meetup.title}</Title>
        <Detail icon="event">{meetup.title}</Detail>
        <Detail icon="place">{meetup.location}</Detail>
        <Detail icon="person">Organizador: {meetup.user.name}</Detail>
        <ActionButton
          subscribed={subscribed}
          onPress={() => onPress(meetup.id)}
        >
          {subscribed ? 'Cancelar inscrição' : 'Realizar inscrição'}
        </ActionButton>
      </Content>
    </Container>
  );
}
