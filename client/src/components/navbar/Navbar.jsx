/* eslint-disable react/prop-types */
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { Link as NavtabLink } from "react-router-dom";
import Logo from "../../assets/BookItBash.png";
import "./navbar.css";
import Auth from "../../utils/auth";

export default function Navtab(props, { isMenuOpen, setIsMenuOpen }) {
  const currentPage = useLocation().pathname;
  // const [] = React.useState(false);
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  // const handleClick = ()=> setIsMenuOpen(!isMenuOpen);
  const loggedOutItems = [
    {
      id: 1,
      path: "/",
      pathname: "Home",
    },
    {
      id: 2,
      path: "/Profile",
      pathname: "Profile",
    },
    {
      id: 3,
      path: "/Login",
      pathname: "Login",
    },
    {
      id: 4,
      path: "/Signup",
      pathname: "Sign Up",
    },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="purple-dark text-primary-50 bg-primary-900"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <img src={Logo} alt="logo" width={64} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {loggedOutItems
          .map((navItem) => (
            <NavbarItem
              key={navItem.id}
              className="text-primary-50 mx-25"
              id="Item"
            >
              <NavtabLink
                key={navItem.id}
                to={navItem.path}
                className={
                  currentPage === navItem.path
                    ? "text-primary-50 font-bold active"
                    : "text-primary-50 font-bold"
                }
              >
                {" "}
                {navItem.pathname}{" "}
              </NavtabLink>
              {/* <Link
                to={navItem.path}
                className={
                  currentPage === navItem.path
                    ? "text-primary-50 font-bold active"
                    : "text-primary-50 font-bold"
                } 
              >
                {navItem.pathname}
              </Link> */}
            </NavbarItem>
          ))
          .slice(0, 2)}
      </NavbarContent>
      {Auth.loggedIn() ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden md:flex">
            <Button
              to={loggedOutItems[2].path}
              // eslint-disable-next-line react/prop-types
              name="login"
              variant="flat"
              // eslint-disable-next-line react/prop-types
              onPress={Auth.logout}
              className="text-primary-900 bg-primary-50 w-[80.69px] h-[40px] px-16px rounded-medium justify-center text-base hover:opacity-80"
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden md:flex">
            <Button
              to={loggedOutItems[2].path}
              // eslint-disable-next-line react/prop-types
              name="login"
              variant="flat"
              // eslint-disable-next-line react/prop-types
              onPress={props.onOpen}
              className="text-primary-900 bg-primary-50 w-[80.69px] h-[40px] px-16px rounded-medium justify-center text-base hover:opacity-80"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              as={Link}
              to={loggedOutItems[3].path}
              className="text-primary-900 bg-primary-50 text-base"
              href="#"
              variant="flat"
              name="signup"
              // eslint-disable-next-line react/prop-types
              onPress={props.onOpen}
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* Mobile menu */}
      <NavbarMenu className=" purple-dark bg-primary-900">
        <NavbarMenuItem>
          <NavtabLink
            className="w-full text-primary-50 my-8"
            size="lg"
            to="/"
            onClick={handleMenuItemClick}
          >
            Home
          </NavtabLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavtabLink
            className="w-full text-primary-50 my-8"
            size="lg"
            to="/Profile"
            onClick={handleMenuItemClick}
          >
            Profile
          </NavtabLink>
        </NavbarMenuItem>
        {Auth.loggedIn() ? (
          <NavbarMenuItem>
            <NavtabLink
              className="w-full text-primary-50 my-8"
              size="lg"
              onClick={() => {
                Auth.logout();
                handleMenuItemClick();
              }}
            >
              Logout
            </NavtabLink>
          </NavbarMenuItem>
        ) : (
          <>
            <NavbarMenuItem>
              <NavtabLink
                className="w-full text-primary-50 my-8"
                size="lg"
                name="login"
                onClick={props.onOpen}
              >
                Login
              </NavtabLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavtabLink
                className="w-full text-primary-50 my-8"
                size="lg"
                name="signup"
                onClick={props.onOpen}
              >
                SignUp
              </NavtabLink>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}

{
  /* <Link
                // color={
                //   menuItems.id === 2
                //     ? "primary"
                //     : menuItems.id === loggedOutItems.length - 1
                //     ? "danger"
                //     : "foreground"
                // }
                className="w-full text-primary-50 my-8"
                href="#"
                size="lg"
              >
                {menuItems.pathname}
              </Link> */
}

{
  /* Good code */
}
{
  /* <NavbarMenu className=" purple-dark bg-primary-900">
        {loggedOutItems
          .map((menuItems) => (
            
            <NavbarMenuItem key={menuItems.id}>
              <NavtabLink key={menuItems.id} to={menuItems.path} className="w-full text-primary-50 my-8" size="lg">
                {menuItems.pathname}
              </NavtabLink>
          
            </NavbarMenuItem>
            
          ))
          .slice(0,2)}
          
          
      </NavbarMenu> */
}
