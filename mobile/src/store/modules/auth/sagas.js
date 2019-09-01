import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import NavigationService from '~/services/NavigationService';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, '/sessions', { email, password });

    const { user, token } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'Houve um erro no login, verifique seus dados.'
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
    NavigationService.navigate('SignIn');
  } catch (err) {
    console.tron.log(err);
    Alert.alert(
      'Falha no cadastro',
      err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'Houve um erro no cadastro, verifique seus dados.'
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
