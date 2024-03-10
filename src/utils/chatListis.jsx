import { FaPhone } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { PiSignOutLight } from "react-icons/pi";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <FaUserCircle />,
  },
  {
    title: "Settings",
    icon: <IoSettingsOutline />,
  },
  {
    title: "Sign Out",
    icon: <PiSignOutLight />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <BsThreeDotsVertical />,
  },
  {
    index: 1,
    icon: <FaUserCircle />,
  },
  {
    index: 2,
    icon: <FaPhone />,
  },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <IoSettingsOutline />,
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

export { Profile_Menu, Nav_Setting, Nav_Buttons, Message_options };
