import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, '/sessions', { email, password });

    const { user, token } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'Falha na autenticação, verifique seus dados.';
    toast.error(errorMessage);
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
      provider: true,
    });

    history.push('/');
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'Falha na cadastro, verifique seus dados.';
    toast.error(errorMessage);
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
function signOut() {
  history.push('/');
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
