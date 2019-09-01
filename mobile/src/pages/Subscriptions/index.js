import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import api from '~/services/api';
import Background from '~/components/Background';
import { Container, List, Empty } from './styles';
import Header from '~/components/Header';
import MeetupCard from '~/components/MeetupCard';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState();
  const [loading, setLoading] = useState(false);
  const unsubscribe = async item => {
    try {
      await api.delete(`subscriptions/${item.id}`);
      setSubscriptions(subscriptions.filter(subs => subs.id !== item.id));
      Alert.alert(
        'Successo',
        `Você se desinscreveu do Meetup "${item.meetup.title}"`
      );
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        err.response.data.error
          ? err.response.data.error
          : 'Não foi possível cancelar a sua inscrição'
      );
    }
  };

  useEffect(() => {
    async function loadSubscriptions() {
      setLoading(true);
      try {
        const response = await api.get('subscriptions');

        if (response.status === 200) {
          setSubscriptions(
            response.data
              .filter(item => !item.past)
              .map(item => {
                return {
                  ...item,
                  meetup: {
                    ...item.meetup,
                    dateFormatted: format(
                      parseISO(item.meetup.date),
                      "d 'de' MMMM, 'às' HH:mm",
                      {
                        locale: pt,
                      }
                    ),
                  },
                };
              })
          );
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar meetups, tente mais tarde'
        );
      }
    }
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            ListEmptyComponent={<Empty>Não foi encontrado nenhum meetup</Empty>}
            renderItem={({ item }) => (
              <MeetupCard
                meetup={item.meetup}
                subscribed
                onPress={() => unsubscribe(item)}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

function TabBarIcon({ tintColor }) {
  return <Icon name="local-offer" size={20} color={tintColor} />;
}
TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: TabBarIcon,
};

export default withNavigationFocus(Subscriptions);
