import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
          </Profile>
          <button type="submit" onClick={handleSignOut}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}
