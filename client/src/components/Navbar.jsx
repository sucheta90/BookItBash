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
import Logo from "../assets/BookItBash.png";

export default function App() {
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
      pathname: "Signup",
    },
  ];
  const loggedInItems = [
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
  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {loggedOutItems.map((navItem) => (
          <NavbarItem
            key={navItem.id}
            className="purple-dark text-primary-500 font-bold"
            id="Item"
          >
            <Link
              to={navItem.path}
              className={
                currentPage === navItem.path ? "nav-link active" : "nav-link"
              }
            >
              {navItem.pathname}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {loggedOutItems.map((navItem) => (
          <NavbarMenuItem key={navItem.id}>
            <Link
              color={
                navItem.id === 2
                  ? "primary"
                  : navItem === loggedOutItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {navItem.pathname}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
