import React, { useRef, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Background from '~/components/Background';
import Header from '~/components/Header';
import {
  Container,
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
  async function handleSubmit() {
    try {
      await schema.validate({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      });
      dispatch(
        updateProfileRequest({
          name,
          email,
          oldPassword,
          password,
          confirmPassword,
        })
      );
    } catch ({ message }) {
      Alert.alert('Erro', message);
    }
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
function TabBarIcon({ tintColor }) {
  return <Icon name="person" size={20} color={tintColor} />;
}
TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: TabBarIcon,
};
