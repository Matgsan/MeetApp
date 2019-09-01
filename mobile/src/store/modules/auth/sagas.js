import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, '/sessions', { email, password });

    const { user, token } = response.data;
    if (user.provider) {
      Alert.alert('Erro no login', 'Usuário não pode ser prestador de serviço');
      return;
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados.'
    );
    yield put(signFailure());
  }
}
export function* signUp({ payload }) {
  const { name, email, password } = payload;
  try {
    yield call(api.post, '/users', {
      name,
      email,
      password,
    });
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados.'
    );
    yield put(signFailure());
  }
}
function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
function signOut() {}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
