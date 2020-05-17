import React, { Component } from "react";
import { storeProducts } from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      detalProduct: {},
      cart: [],
      modalProduct: {},
      modalOpen: false,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0,
    };
  }

  componentDidMount() {
    this.setProduct();
  }

  setProduct = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    console.log("chto handle");
    this.setState({
      detalProduct: { ...product },
    });
  };
  addToCard = (id) => {
    let tempProduct = [...this.state.products];
    const index = tempProduct.indexOf(this.getItem(id));
    const product = tempProduct[index];
    product.incard = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      {
        products: tempProduct,
        cart: [...this.state.cart, product],
      },
      () => this.addTotals()
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({
      modalProduct: product,
      modalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  increment = (id) => {
    let temCart = [...this.state.cart];
    const selectedProduct = temCart.find((item) => item.id === id);

    const index = temCart.indexOf(selectedProduct);
    const product = temCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      {
        cart: [...temCart],
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = (id) => {
    let temCart = [...this.state.cart];
    const selectedProduct = temCart.find((item) => item.id === id);

    const index = temCart.indexOf(selectedProduct);
    const product = temCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;

      this.setState(
        {
          cart: [...temCart],
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = (id) => {
    let tempProduct = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProduct.indexOf(this.getItem(id));
    let removedProduct = tempProduct[index];
    removedProduct["incard"] = false;
    removedProduct["count"] = 0;
    removedProduct["total"] = 0;
    this.setState(
      {
        cart: [...tempCart],
        products: [...tempProduct],
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    this.setState(
      {
        cart: [],
      },
      () => {
        this.setProduct();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          products: this.state.products,
          detalProduct: this.state.detalProduct,
          handleDetail: this.handleDetail,
          addToCard: this.addToCard,
          modalOpen: this.state.modalOpen,
          closeModal: this.closeModal,
          openModal: this.openModal,
          modalProduct: this.state.modalProduct,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          cart: this.state.cart,
          cartSubTotal: this.state.cartSubTotal,
          cartTax: this.state.cartTax,
          cartTotal: this.state.cartTotal,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
