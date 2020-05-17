import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "./smallComp/context";
import ButtonContainer from "./smallComp/Button";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export class Modal extends Component {
  render() {
    return (
      <div>
        <ProductConsumer>
          {(value) => {
            const { modalOpen } = value;
            const { id, img, title, price } = value.detalProduct;

            if (!modalOpen) {
              return null;
            } else {
              return (
                <ModalContainer>
                  <div className="container my-auto">
                    <div className="row">
                      <div
                        id="modal"
                        className="col-8  col-md-6 col-lg-4 text-center mx-auto my-auto text-capitalize p-5"
                      >
                        <h5>item added to the card</h5>

                        <img
                          src={img}
                          style={{ width: "200px", height: "300px" }}
                          clasName="img-fluid"
                          alt="product"
                        />

                        <h5>{title}</h5>
                        <h5 className="text-muted">price : $ {price}</h5>
                        <Link to="/">
                          <ButtonContainer
                            onClick={() => {
                              value.closeModal();
                              value.addToCard(id);
                            }}
                          >
                            store
                          </ButtonContainer>
                        </Link>
                        <Link to="/cart">
                          <ButtonContainer
                            card={true}
                            onClick={() => {
                              value.closeModal();
                              value.addToCard(id);
                            }}
                          >
                            go to card
                          </ButtonContainer>
                        </Link>
                      </div>
                    </div>
                  </div>
                </ModalContainer>
              );
            }
          }}
        </ProductConsumer>
      </div>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-item: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;

export default Modal;
