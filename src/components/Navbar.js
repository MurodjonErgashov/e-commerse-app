import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/all";
import { DiEmber } from "react-icons/di";
import ButtonContainer from "./smallComp/Button";
import styled from "styled-components";

class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="d-flex flex-row justify-content-between navbar navbar-expand-sm  navbar-dark px-sm-5">
        <Link to="/">
          <DiEmber
            className="navbar-brand"
            style={{ fontSize: "4rem", color: "gold" }}
          />
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              products
            </Link>
          </li>
        </ul>
        <Link to="/cart">
          <ButtonContainer>
            <span className="mr-2">
              <FaCartPlus />
            </span>
            my card
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

export default Navbar;
