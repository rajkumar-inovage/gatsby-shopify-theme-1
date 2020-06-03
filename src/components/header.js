import { Link } from "gatsby"; /* eslint-disable */
import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import StoreContext from "../context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faUser,
  faSearch
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
  DropdownMenu
} from "reactstrap";

const countQuantity = lineItems => {
  let quantity = 0;

  lineItems.forEach(item => {
    quantity = quantity + item.quantity;
  });
  return quantity;
};

const Header = ({ siteTitle }) => {
  const context = useContext(StoreContext);
  const { checkout } = context;
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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  return (
    <>
      <header>
        <div className="fixed-header w-100 m-0">
          <p
            className="text-center josefin-sans-sb primary-color p-2"
            style={{ fontSize: "1.4rem" }}
          >
            Free local shipping within the GTA for orders over $45
          </p>
        </div>
        <Navbar
          color="light"
          light={true}
          expand="lg"
          className="bg-white p-3 p-sm-0 sticky-header"
        >
          <Container>
            <div className="navbar-start m-0">
              <h1>
                <Link
                  aria-label="search"
                  className="has-text-black has-text-weight-bold"
                  to="/"
                >
                  <img src={logo} alt="" className="img-fluid" />
                </Link>
              </h1>
            </div>
            <div className="">
              <NavbarToggler onClick={toggle} />
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
                      to="collections/essentials/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Essential
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="collections/fragrant/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Fragrant
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="collections/figure/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Figure
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="collections/donut/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Donut
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="collections/bath-bath-bomb/"
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Bath bombs
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="collections/treat/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Treat
                    </Link>
                  </NavItem>
                  <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                    <Link
                      to="collections/gift/"
                      onClick={closeNav}
                      className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link font-weight-bold"
                    >
                      Gift
                    </Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </div>

            <div className="navbar-end d-flex">
              <div className="navbar-item">
                <FontAwesomeIcon
                  className="has-text-dark is-size-5"
                  onClick={openSearchBar}
                  icon={faSearch}
                />
              </div>
              <div className="navbar-item">
                <Link aria-label="cart" to="/account/login">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="is-size-5 has-text-dark"
                  />
                </Link>
              </div>
              <div className="navbar-item">
                <Link aria-label="cart" to="/cart">
                  {" "}
                  {quantity > 0 ? (
                    <i
                      data-badge="0"
                      className="fas fa-shopping-bag has-text-dark is-size-5"
                    ></i>
                  ) : (
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="is-size-5 has-text-dark"
                    />
                  )}
                </Link>
              </div>
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
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search"
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
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
