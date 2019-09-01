import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { signUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const passwordRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <Background>
      <Container>
        <Image source={logo} />
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
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
        </Form>
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Criar conta
        </SubmitButton>
        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <SignLinkText>Já tenho login</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
