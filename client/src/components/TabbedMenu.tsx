import React from "react";
import styled from "styled-components";

interface TabItems {
  text: string;
  state: boolean;
  onClick: any;
}

export const TabbedMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div style={{ backgroundColor: "white", borderRadius: "8px" }}>{children}</div>;
};

export const TabbedMenuBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section style={{ padding: "8px 24px 24px 24px" }}>{children}</section>;
};

export function TabbedMenuTabLeft(props: TabItems) {
  return (
    <StyledLeftTab state={props.state} onClick={props.onClick}>
      {props.text}
    </StyledLeftTab>
  );
}

export function TabbedMenuTabRight(props: TabItems) {
  return (
    <StyledRightTab state={props.state} onClick={props.onClick}>
      {props.text}
    </StyledRightTab>
  );
}
export const TabbedMenuTabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

const StyledLeftTab = styled.div<{ state: boolean }>`
  display: flex;
  height: 48px;
  width: 100%;
  user-select: none;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  ${({ state }) =>
    state &&
    `
    border-top-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 4px;
    border-left: 4px;
    background-color: #c2c2c2;
  `}
`;

const StyledRightTab = styled.div<{ state: boolean }>`
  display: flex;
  height: 48px;
  width: 100%;
  user-select: none;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  ${({ state }) =>
    state &&
    `
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-top: 4px;
    border-right: 4px;
    background-color: #c2c2c2;
  `}
`;
const StyledDiv = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
