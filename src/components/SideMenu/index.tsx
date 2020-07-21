import React from "react";
import { Wrapper, Link } from "./style";
import { FaRegCalendarAlt, FaUsers, FaCog } from "react-icons/fa";

export const SideMenu = () => {
  return (
    <Wrapper>
      <ul>
        <span>
          <Link exact to="/" activeStyle={{ opacity: "1" }}>
            <FaRegCalendarAlt size="32" />
          </Link>
          <Link to="/students" activeStyle={{ opacity: "1" }}>
            <FaUsers size="32" />
          </Link>
        </span>
        <Link to="/settings" activeStyle={{ opacity: "1" }}>
          <FaCog size="32" />
        </Link>
      </ul>
    </Wrapper>
  );
};
