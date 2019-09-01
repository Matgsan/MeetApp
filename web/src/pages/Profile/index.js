import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
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
