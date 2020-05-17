import React from "react";
import { MdDelete } from "react-icons/md";

function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  // const { increment, decrement, removeItem } = value;
  return (
    <div className="row my-1 text-capitalize text-center">
      <div mx-auto className="col-10   col-lg-2">
        <img
          src={img}
          alt="product"
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
        />
      </div>
      <div mx-auto className="col-10   col-lg-2">
        <span className="d-lg-none">product : </span>
        {title}
      </div>
      <div mx-auto className="col-10   col-lg-2">
        <span className="d-lg-none">price : </span>
        {price}
      </div>
      <div className="col-10  col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <span
            className="btn btn-outline-secondary mx-1"
            onClick={() => value.decrement(id)}
          >
            -
          </span>
          <span className="btn btn-outline-secondary mx-1">{count}</span>
          <span
            className="btn btn-outline-secondary mx-1"
            onClick={() => value.increment(id)}
          >
            +
          </span>
        </div>
      </div>
      <div mx-auto className="col-10   col-lg-2">
        <div className="cart-icon">
          <MdDelete
            onClick={() => {
              value.removeItem(id);
            }}
          />
        </div>
      </div>
      <div mx-auto className="col-10   col-lg-2">
        <strong> item total : $ {total}</strong>
      </div>
    </div>
  );
}

export default CartItem;
