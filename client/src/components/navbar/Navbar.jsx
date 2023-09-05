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

export default function Navtab() {
  const currentPage = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
          className="sm:hidden"
        />
        <NavbarBrand>
          <img src={Logo} alt="logo" width={64} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {loggedOutItems
          .map((navItem) => (
            <NavtabLink key={navItem.id} to={navItem.path}>
            <NavbarItem key={navItem.id} className="text-primary-50 mx-25" id = "Item">
              <Link
                to={navItem.path}
                className={
                  currentPage === navItem.path
                    ? "text-primary-50 font-bold active"
                    : "text-primary-50 font-bold"
                } 
              >
                {navItem.pathname}
              </Link>
            </NavbarItem>
            </NavtabLink>
          ))
          .slice(0, 2)}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            to={loggedOutItems[2].path}
            className="text-primary-900 bg-primary-50 w-[80.69px] h-[40px] px-16px rounded-medium justify-center text-base"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            to={loggedOutItems[3].path}
            className="text-primary-900 bg-primary-50 text-base"
            href="#"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className=" purple-dark bg-primary-900">
        {loggedOutItems
          .map((menuItems) => (
            <NavtabLink key={menuItems.id} to={menuItems.path}>
            <NavbarMenuItem key={menuItems.id}>
              <Link
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
              </Link>
            </NavbarMenuItem>
            </NavtabLink>
          ))
          .slice(0, 3)}
      </NavbarMenu>
    </Navbar>
  );
}
