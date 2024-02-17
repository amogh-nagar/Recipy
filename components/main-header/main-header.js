import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBG from "./main-header-bg";
import NavLink from "./nav-link";
const MainHeader = () => {
  return (
    <>
      <MainHeaderBG />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image priority src={logoImg} alt="A plat with food on it" />
          Next Level Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={"/meals"}>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href={"/community"}>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
