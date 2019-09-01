import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(
      6,
      'Senha deve conter no mínimo 6 caracteres'
    ),
    password: Yup.string()
      .min(6, 'Nova senha deve conter no mínimo 6 caracteres')
      .when('oldPassword', (value, field) =>
        value ? field.required('Nova senha deve ser preenchida') : field
      ),
    confirmPassword: Yup.string().when('password', (value, field) =>
      value
        ? field.required().oneOf([Yup.ref('password')], 'Senhas não coincidem')
        : field
    ),
  });
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }
  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Endereço de email" />
        <hr />
        <Input name="oldPassword" type="password" placeholder="Senha atual" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />
        <div>
          <button type="submit">
            <MdAddCircleOutline color="#FFF" size={22} />
            Salvar perfil
          </button>
        </div>
      </Form>
    </Container>
  );
}
