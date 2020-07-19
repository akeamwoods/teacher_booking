import styled from "styled-components";

type WrapperProps = {
  isSelected: boolean;
  isWithinRange: boolean;
  isDate: boolean;
};

export const Wrapper = styled.div.attrs((props: WrapperProps) => ({}))<
  WrapperProps
>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? "#1B1B1B" : props.isWithinRange ? "#EBEBEB" : undefined};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  opacity: ${(props) => (props.isSelected ? 1 : undefined)};
  :hover {
    background: ${(props) =>
      !props.isSelected && props.isDate ? "#1B1B1B" : undefined};
    color: ${(props) =>
      !props.isSelected && props.isDate ? "#fff" : undefined};
  }
`;

type DateTextProps = {
  differentMonth: boolean;
  isHeading: boolean;
};

export const DateText = styled.p.attrs((props: DateTextProps) => ({}))<
  DateTextProps
>`
  opacity: ${(props) => (props.differentMonth && !props.isHeading ? 0.5 : 1)};
  font-weight: ${(props) => (props.isHeading ? 600 : 0)};
`;
