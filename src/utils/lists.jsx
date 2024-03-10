import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";

export const NavbarList = {
  home: {
    en: "home",
    fr: "home",
    icon: <AiOutlineHome />,
  },
  cart: {
    en: "Cart",
    fr: "Panier",
    icon: <BsCart3 />,
  },
  Contact: {
    en: "Messages",
    fr: "france",
    icon: <IoChatbubbleEllipsesOutline />,
    link: "/Chat",
  },
  acount: {
    en: "Acount",
    icon: <IoPersonOutline />,
    link: "/SignIn",
  },
  signIn: {
    en: "Sign in",
    icon: <IoPersonOutline />,
    link: "/SignIn",
  },
  SignUp: {
    en: "Register",
    link: "/Register",
  },
};
export const ButtomNavList = [
  {
    en: "home",
    fr: "home",
    icon: <AiOutlineHome />,
  },
  {
    en: "Cart",
    fr: "Panier",
    icon: <BsCart3 />,
  },
  {
    en: "Messages",
    fr: "france",
    icon: <IoChatbubbleEllipsesOutline />,
    link: "/Chat",
  },
  {
    en: "Acount",
    icon: <IoPersonOutline />,
    link: "/Dashboard",
  },
];

const categoryList = [
  {
    category: {
      title: "Food & Drinks",
      subCategory: [""],
    },
  },
];
