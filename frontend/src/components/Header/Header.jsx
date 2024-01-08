import LogoText from "../LogoText";
import { Navbar } from "./Navbar";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  //align-items: center;
  justify-content: space-between;
  //border-bottom: 2px solid floralwhite;
  /* position: fixed;
  top: 0;
  width: 100%; */
  padding: 10px 5px 0 10px;
  //background-color: #fff;
  background: #633d57;
  /* background-color: var(--secondaryColor); */

  @media (min-width: 1100px) {
    padding: 10px 30px 0 10px;
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <LogoText />
      <Navbar />
    </StyledHeader>
  );
};
