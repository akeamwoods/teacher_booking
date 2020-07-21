import React from "react";
import { Wrapper } from "./style";
import { FaRegCalendarAlt, FaUsers, FaCog } from "react-icons/fa";

export const SideMenu = () => {
  return (
    <Wrapper>
      <span>
        <button>
          <FaRegCalendarAlt size="32" />
        </button>
        <button>
          <FaUsers size="32" />
        </button>
      </span>
      <button>
        <FaCog size="32" />
      </button>
    </Wrapper>
  );
};
