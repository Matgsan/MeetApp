import React from 'react';
import { Container, Content, Logo } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Container>
      <Content>
        <Logo source={logo} />
      </Content>
    </Container>
  );
}
