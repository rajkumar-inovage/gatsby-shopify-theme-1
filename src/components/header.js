import { Link } from "gatsby"; /* eslint-disable */
import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import $ from "jquery";
import StoreContext from "~/context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/demosoap-logo.webp";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

const countQuantity = (lineItems) => {
  let quantity = 0;

  lineItems.forEach((item) => {
    quantity = quantity + item.quantity;
  });
  return quantity;
};

const Header = ({ siteTitle }) => {
  const isBrowser = typeof window !== "undefined";
  const context = useContext(StoreContext);
  const { removeLineItem, client, checkout } = context;
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const getLineItemTotal = (quantity, variantPrice) => {
    const lineItemTotal = quantity * variantPrice;
    return lineItemTotal.toFixed(2);
  };
  const getCartCount = () => {
    if (cartCount !== 0) {
      return cartCount;
    } else {
      return "";
    }
  };
    const handleRemove = (event, lineItemId) => {
      removeLineItem(client, checkout.id, lineItemId).then(() => {
        setCartCount(cartCount - 1);
      });
    };
  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };
  const lineItems = checkout.lineItems;
  const subtotalPrice = checkout.subtotalPrice;
  useEffect(() => {
    if (checkout.lineItems.length > 0) {
      setCartCount(checkout.lineItems.length);
    }
    if (isBrowser) {
      $(window).scroll(function() {
        var sticky = $(".sticky"),
          scroll = $(window).scrollTop();

        if (scroll >= 150) sticky.addClass("sticky-show");
        else sticky.removeClass("sticky-show");
      });
    }
  }, [checkout]);

  const [quantity, setQuantity] = useState(
    countQuantity(checkout ? checkout.lineItems : [])
  );
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []));
  }, [checkout]);

  const openSearchBar = () => {
    setModal(true);
  };
  const closeSearchBar = () => {
    setModal(false);
  };

  const closeNav = () => setIsOpen(false);
  return (
    <>
      <header>
        <div className="fixed-header w-100 m-0 position-fixed bg-white" style={{zIndex:'99'}}>
          <p
            className="text-center josefin-sans-sb primary-color p-2"
            style={{ fontSize: "1.4rem" }}
          >
            Free local shipping within the GTA for orders over $45
          </p>
        </div>
        <Navbar
          light={true}
          expand="lg"
          className="bg-transparent px-3 py-sm-0 py-md-3 default-header"
        >
          <Container>
            <div className="navbar-start m-0 logo-box mt-3">
              <Link
                aria-label="search"
                className="has-text-black has-text-weight-bold"
                to="/"
              >
                <img src={logo} alt="" className="img-fluid" />
              </Link>
            </div>
            <NavbarToggler
              onClick={toggle}
              style={{ padding: "0.25rem 0.5rem", fontSize: "1rem" }}
            />
            <div className="d-lg-flex w-100">
              <Collapse
                isOpen={isOpen}
                navbar
                className="text-center text-lg-left"
              >
                <Nav
                  className="mr-0 ml-auto josefin-sans py-0 w-100 text-center d-lg-block"
                  navbar
                >
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/essentials/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Essential
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/fragrant/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Fragrant
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/figure/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Figure
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/donut/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Donut
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/bath-bath-bomb/"
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Bath bombs
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/treat/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Treat
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/gift/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Gift
                    </Link>
                  </NavItem>
                </Nav>
                <div className="navbar-end d-block d-lg-flex text-center pb-3 pb-lg-0">
                  <div className="navbar-item d-inline-block">
                    <span
                      className="has-text-dark is-size-5"
                      onClick={openSearchBar}
                      icon={faSearch}
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="navbar-item d-inline-block">
                    <Link aria-label="cart" to="/account/login">
                      <span icon={faUser} className="is-size-5 has-text-dark">
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </Link>
                  </div>

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="cart position-relative">
                      <i
                        className="fa fa-shopping-cart text-dark"
                        aria-hidden="true"
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                      <span
                        className="position-absolute cart-counter text-dark josefin-sans pl-2"
                        style={{ top: "-3px" }}
                      >
                        {getCartCount()}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-right rounded-0">
                      {lineItems.length > 0 ? (
                        <ul className="list-group">
                          {lineItems.map((lineItem, index) => (
                            <li
                              key={index}
                              className={
                                index > 0
                                  ? "list-group-item p-2 border-left-0 border-right-0 border-bottom-0 rounded-0"
                                  : "list-group-item p-2 border-0 rounded-0"
                              }
                            >
                              <div className="media">
                                <div className="media-left">
                                  <button
                                    onClick={(e) =>
                                      handleRemove(e, lineItem.id)
                                    }
                                    className="btn btn-link p-0 text-dark"
                                    title="Remove this item"
                                  >
                                    <i className="fa fa-remove"></i>
                                  </button>
                                </div>
                                <div className="media-left">
                                  <img
                                    src={lineItem.variant.image.src}
                                    alt=""
                                    className="img-fluid"
                                    style={{ maxWidth: "70px" }}
                                  />
                                </div>
                                <div className="media-body">
                                  <span className="d-block text-dark fs-1 josefin-sans-b">
                                    {lineItem.title}
                                  </span>

                                  <span className="text-dark fs-2 float-left josefin-sans">
                                    X&nbsp;{lineItem.quantity}
                                  </span>
                                  <span className="color-primary fs-2 float-right josefin-sans-b">
                                    CAD&nbsp;
                                    <span className="color-primary fs-2 josefin-sans">
                                      $&nbsp;
                                    </span>
                                    <span className="color-primary fs-2 josefin-sans-b">
                                      {getLineItemTotal(
                                        lineItem.quantity,
                                        lineItem.variant.price
                                      )}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                          <li className="list-group-item p-2 text-center border-left-0 border-right-0 mb-0 rounded-0">
                            <p className="text-center mb-0 color-primary">
                              <strong className="josefin-sans-b">
                                Subtotal:{" "}
                              </strong>
                              <span className="text-dark josefin-sans-b fs-2 font-weight-bold amount">
                                CAD&nbsp;
                                <span className="text-dark josefin-sans fs-2 font-weight-bold currencySymbol">
                                  $
                                </span>
                                {subtotalPrice}
                              </span>
                            </p>
                          </li>
                          <li className="list-group-item p-2 text-center border-0 rounded-0">
                            <Link
                              to="/cart/"
                              className="btn btn-custom-secondary josefin-sans-b font-weight-bold btn-sm  mx-1"
                              style={{ color: "#000" }}
                            >
                              View Cart
                            </Link>
                            <button
                              onClick={handleCheckout}
                              className="btn btn-checkout josefin-sans-b btn-sm font-weight-bold space-1 text-dark mx-1"
                              style={{ color: "#000" }}
                            >
                              Checkout
                            </button>
                          </li>
                        </ul>
                      ) : (
                        <p className="text-center mb-0 color-primary josefin-sans">
                          Cart is Empty!
                        </p>
                      )}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Collapse>
            </div>
          </Container>
        </Navbar>
        <Navbar
          light={true}
          expand="lg"
          className="bg-white px-3 py-sm-0 py-md-3 sticky"
        >
          <Container>
            <div className="navbar-start m-0 logo-box mt-0">
              <Link
                aria-label="search"
                className="has-text-black has-text-weight-bold"
                to="/"
              >
                <img src={logo} alt="" className="img-fluid" style={{width:'75px'}}/>
              </Link>
            </div>
            <NavbarToggler
              onClick={toggle}
              style={{ padding: "0.25rem 0.5rem", fontSize: "1rem" }}
            />
            <div className="d-lg-flex w-100">
              <Collapse
                isOpen={isOpen}
                navbar
                className="text-center text-lg-left"
              >
                <Nav
                  className="mr-0 ml-auto josefin-sans py-0 w-100 text-center d-lg-block"
                  navbar
                >
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/essentials/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Essential
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/fragrant/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Fragrant
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/figure/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Figure
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/donut/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Donut
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/bath-bath-bomb/"
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Bath bombs
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/treat/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Treat
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="/collections/gift/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Gift
                    </Link>
                  </NavItem>
                </Nav>
                <div className="navbar-end d-block d-lg-flex text-center pb-3 pb-lg-0">
                  <div className="navbar-item d-inline-block">
                    <span
                      className="has-text-dark is-size-5"
                      onClick={openSearchBar}
                      icon={faSearch}
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="navbar-item d-inline-block">
                    <Link aria-label="cart" to="/account/login">
                      <span icon={faUser} className="is-size-5 has-text-dark">
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </Link>
                  </div>

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="cart position-relative">
                      <i
                        className="fa fa-shopping-cart text-dark"
                        aria-hidden="true"
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                      <span
                        className="position-absolute cart-counter text-dark josefin-sans pl-2"
                        style={{ top: "-3px" }}
                      >
                        {getCartCount()}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-right rounded-0">
                      {lineItems.length > 0 ? (
                        <ul className="list-group">
                          {lineItems.map((lineItem, index) => (
                            <li
                              key={index}
                              className={
                                index > 0
                                  ? "list-group-item p-2 border-left-0 border-right-0 border-bottom-0 rounded-0"
                                  : "list-group-item p-2 border-0 rounded-0"
                              }
                            >
                              <div className="media">
                                <div className="media-left">
                                  <button
                                    onClick={(e) =>
                                      handleRemove(e, lineItem.id)
                                    }
                                    className="btn btn-link p-0 text-dark"
                                    title="Remove this item"
                                  >
                                    <i className="fa fa-remove"></i>
                                  </button>
                                </div>
                                <div className="media-left">
                                  <img
                                    src={lineItem.variant.image.src}
                                    alt=""
                                    className="img-fluid"
                                    style={{ maxWidth: "70px" }}
                                  />
                                </div>
                                <div className="media-body">
                                  <span className="d-block text-dark fs-1 josefin-sans-b">
                                    {lineItem.title}
                                  </span>

                                  <span className="text-dark fs-2 float-left josefin-sans">
                                    X&nbsp;{lineItem.quantity}
                                  </span>
                                  <span className="color-primary fs-2 float-right josefin-sans-b">
                                    CAD&nbsp;
                                    <span className="color-primary fs-2 josefin-sans">
                                      $&nbsp;
                                    </span>
                                    <span className="color-primary fs-2 josefin-sans-b">
                                      {getLineItemTotal(
                                        lineItem.quantity,
                                        lineItem.variant.price
                                      )}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                          <li className="list-group-item p-2 text-center border-left-0 border-right-0 mb-0 rounded-0">
                            <p className="text-center mb-0 color-primary">
                              <strong className="josefin-sans-b">
                                Subtotal:{" "}
                              </strong>
                              <span className="text-dark josefin-sans-b fs-2 font-weight-bold amount">
                                CAD&nbsp;
                                <span className="text-dark josefin-sans fs-2 font-weight-bold currencySymbol">
                                  $
                                </span>
                                {subtotalPrice}
                              </span>
                            </p>
                          </li>
                          <li className="list-group-item p-2 text-center border-0 rounded-0">
                            <Link
                              to="/cart/"
                              className="btn btn-custom-secondary josefin-sans-b font-weight-bold btn-sm  mx-1"
                              style={{ color: "#000" }}
                            >
                              View Cart
                            </Link>
                            <button
                              onClick={handleCheckout}
                              className="btn btn-checkout josefin-sans-b btn-sm font-weight-bold space-1 text-dark mx-1"
                              style={{ color: "#000" }}
                            >
                              Checkout
                            </button>
                          </li>
                        </ul>
                      ) : (
                        <p className="text-center mb-0 color-primary josefin-sans">
                          Cart is Empty!
                        </p>
                      )}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Collapse>
            </div>
          </Container>
        </Navbar>
        <div className={` ${modal === true ? "modal is-active" : "modal"}`}>
          <div className="modal-background" onClick={closeSearchBar}></div>
          <div className="modal-content bg-transparent">
            <div className="field">
              <div className="control has-icons-right">
                <form
                  action="../search"
                  method="GET"
                  className="col-10 col-lg-6 mx-auto"
                >
                  <input
                    className="input is-large josefin-sans-sb"
                    name="value"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <span className="icon is-right">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <label className="has-text-white w-100 text-center mt-3 josefin-sans-sb">
                    ENTER ↵
                  </label>
                </form>
              </div>
            </div>
          </div>

          <button
            className="modal-close is-large"
            onClick={closeSearchBar}
            aria-label="close"
          ></button>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
