import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { format, subDays, addDays, parseISO } from 'date-fns';
import { debounce } from 'lodash';
import api from '~/services/api';
import Background from '~/components/Background';
import { Container, List, DateSelector, DateText, Empty } from './styles';
import Header from '~/components/Header';
import MeetupCard from '~/components/MeetupCard';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [finished, setFinished] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  const resetStates = () => {
    setPage(1);
    setMeetups([]);
    setFinished(false);
  };
  const handlePreviousDay = useCallback(() => {
    setDate(subDays(date, 1));
    resetStates();
  }, [date]);

  const handleNextDay = useCallback(() => {
    setDate(addDays(date, 1));
    resetStates();
  }, [date]);

  const subscribe = async meetup => {
    try {
      await api.post(`subscriptions/${meetup.id}`);
      Alert.alert('Successo', `Você se inscreveu no Meetup "${meetup.title}"`);
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        err.response.data.error
          ? err.response.data.error
          : 'Não foi possível se inscrever, tente mais tarde'
      );
    }
  };
  async function loadMeetups() {
    if (loading) {
      return;
    }
    if (finished) {
      return;
    }
    setLoading(true);

    try {
      const response = await api.get('meetups', {
        params: { date, page },
      });

      const data = response.data
        .filter(item => !item.past)
        .map(item => {
          return {
            ...item,
            dateFormatted: format(
              parseISO(item.date),
              "d 'de' MMMM, 'às' HH:mm",
              {
                locale: pt,
              }
            ),
          };
        });
      setMeetups(page >= 2 ? [...meetups, ...data] : data);
      setLoading(false);
      setPage(page + 1);
      setFinished(response.data.length < 10);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    }
  }
  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    } else {
      resetStates();
    }
  }, [isFocused, date]); //eslint-disable-line

  return (
    <Background>
      <Header />
      <Container>
        <DateSelector>
          <TouchableOpacity onPress={handlePreviousDay}>
            <Icon name="chevron-left" size={30} color="#FFFF" />
          </TouchableOpacity>
          <DateText>{dateFormatted}</DateText>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#FFFF" />
          </TouchableOpacity>
        </DateSelector>

        <List
          data={meetups}
          onEndReached={debounce(loadMeetups, 1000)}
          onEndReachedThreshold={0.1}
          keyExtractor={item => String(item.id)}
          ListEmptyComponent={<Empty>Não foi encontrado nenhum meetup</Empty>}
          renderItem={({ item }) => (
            <MeetupCard
              loading={loading}
              meetup={item}
              onPress={() => subscribe(item)}
            />
          )}
          ListFooterComponent={() => {
            if (!loading) return null;
            return <ActivityIndicator />;
          }}
        />
      </Container>
    </Background>
  );
}
function TabBarIcon({ tintColor }) {
  return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
}
TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: TabBarIcon,
};

export default withNavigationFocus(Dashboard);
