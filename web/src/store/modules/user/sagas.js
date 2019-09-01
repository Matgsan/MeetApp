import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { email, name, avatar_id, ...rest } = payload.data;
    const profile = {
      name,
      avatar_id,
      email,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, 'users', profile);
    toast.success('Perfil atualizado com sucesso');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'Erro ao atualizar o perfil, verifique seus dados.';
    toast.error(errorMessage);
    yield put(updateProfileFailure());
  }
}
export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
