import React, { useRef, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Background from '~/components/Background';
import Header from '~/components/Header';
import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }
  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            value={name}
            onChangeText={setName}
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
          />
          <Separator />
          <FormInput
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
            placeholder="Senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            ref={passwordRef}
            placeholder="Nova senha"
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
          <FormInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
          />
          <SubmitButton onPress={handleSubmit}>Salvar Perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do Meetapp</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
