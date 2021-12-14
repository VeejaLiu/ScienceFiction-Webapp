import React, { useState, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  DropdownToggle,
} from 'reactstrap';
import logo from '../../assets/images/icon.jpg';
import Avatar from 'react-avatar';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const handleLogout = function handleLogout(e: any) {
    e.preventDefault();
    history.replace('/');
  };
  const getHeaderClasses = useCallback(
    (type?: string, exactMatch?: boolean) => {
      let foundMatch;
      if (exactMatch) {
        foundMatch = type && location.pathname === type;
      } else {
        foundMatch = type && location.pathname.includes(type);
      }
      return `${
        foundMatch ? 'text-nav-not-selected' : 'text-nav-selected'
      } cursor-pointer d-block d-md-inline-block px-2`;
    },
    [location.pathname],
  );

  return (
    <Navbar
      expand="md"
      fixed="top"
      className="py-1 border-bottom"
      style={{ backgroundColor: 'rgba(64,64,64)', margin: 0, padding: 0 }}
    >
      <NavbarBrand href="/dashboard">
        <img
          src={logo}
          alt={'logo'}
          style={{ marginLeft: '10px', width: '40px', height: '40px', borderRadius: '10px' }}
        />
      </NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <Link to="/ask" className={getHeaderClasses('/ask')}>
            元数据管理
          </Link>
        </Nav>
        <NavbarText>
          <UncontrolledDropdown className={getHeaderClasses()}>
            <DropdownToggle nav caret className="p-0">
              <Avatar
                name={'S C'}
                size={'30'}
                round
                color={'darkred'}
                fgColor={'#ffffff'}
                textSizeRatio={2}
              />
            </DropdownToggle>
            <DropdownMenu right className="text-center">
              <DropdownItem
                className={getHeaderClasses('/profile')}
                onClick={() => history.push('/profile')}
              >
                My Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                <i className="fal fa-sign-out-alt mr-2" />
                Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavbarText>
      </Collapse>
    </Navbar>
  );
}

function withHeaderBar(Component: any) {
  return function (props: any) {
    return (
      <>
        <Header {...props} />
        <Component {...props} />
      </>
    );
  };
}

export { withHeaderBar };
export default Header;
