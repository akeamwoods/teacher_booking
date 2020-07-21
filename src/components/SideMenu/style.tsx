import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.nav`
  background: #2296f3;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;

  ul {
    padding: 0;
    list-style: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  span {
    display: flex;
    flex-direction: column;
  }
  span a {
    margin-bottom: 20px;
  }
  a {
    transition: 0.3s;
  }
  a:hover {
    opacity: 1;
  }
`;

export const Link = styled(NavLink)`
  color: #fff;
  opacity: 0.6;
`;
