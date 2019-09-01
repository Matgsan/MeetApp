import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  parseISO,
  isEqual,
} from 'date-fns';
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

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  const handlePreviousDay = useCallback(() => {
    setDate(subDays(date, 1));
  }, [date]);

  const handleNextDay = useCallback(() => {
    setDate(addDays(date, 1));
  }, [date]);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      try {
        const response = await api.get('meetups', {
          params: { date },
        });
        setMeetups(response.data.filter(item => !item.past));
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
      loadMeetups();
    }
  }, [date, isFocused]);

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
        {loading ? (
          <ActivityIndicator />
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            ListEmptyComponent={<Empty>Não foi encontrado nenhum meetup</Empty>}
            renderItem={({ item }) => <MeetupCard meetup={item} />}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
