import React, { useState, useContext, useEffect } from "react";
import StoreContext from "../../../context/store";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import axios from "axios";

const CUSTOMER_CREATE_ADDRESS = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const AddAddressForm = () => {
  const [addAdressForm, setAddAdressForm] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [apartmentInput, setApartmentInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [zipInput, setZipInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const { customerAccessToken } = useContext(StoreContext);

  const [countriesAll, setCountriesAll] = useState([]);

  const getLocations = () => {
    return axios("https://restcountries.eu/rest/v2/all");
  };

  useEffect(() => {
    getLocations().then(({ data }) => {
      setCountriesAll(data);
    });
  }, []);

  return (
    <>
      <button
        className="button is-dark josefin-sans-b"
        onClick={() => setAddAdressForm(!addAdressForm)}
      >
        Add a new adress
      </button>
      {addAdressForm && (
        <div className="columns is-centered">
          <div className="column is-6 has-text-left">
            <Mutation mutation={CUSTOMER_CREATE_ADDRESS}>
              {customerAddressCreate => {
                return (
                  <form>
                    <h1 className="subtitle is-uppercase has-text-weight-semibold josefin-sans-b">
                      ADD A NEW ADDRESS
                    </h1>
                    <div className="columns">
                      <div className="column">
                        <div className="field">
                          <label className="label josefin-sans-b" htmlFor="firstNameInput">
                            First Name
                          </label>
                          <div className="control">
                            <input
                              className="input josefin-sans"
                              value={firstNameInput}
                              type="text"
                              onChange={e => setFirstNameInput(e.target.value)}
                              aria-label="First Name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label josefin-sans-b" htmlFor="lastNameInput">
                            Last Name
                          </label>
                          <div className="control">
                            <input
                              className="input josefin-sans"
                              value={lastNameInput}
                              type="text"
                              onChange={e => setLastNameInput(e.target.value)}
                              aria-label="Last Name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label josefin-sans-b" htmlFor="companyInput">
                        Company
                      </label>
                      <div className="control">
                        <input
                          className="input josefin-sans"
                          value={companyInput}
                          type="text"
                          onChange={e => setCompanyInput(e.target.value)}
                          aria-label="Company"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label josefin-sans-b" htmlFor="addressInput">
                        Address
                      </label>
                      <div className="control">
                        <input
                          className="input josefin-sans"
                          value={addressInput}
                          type="text"
                          onChange={e => setAddressInput(e.target.value)}
                          aria-label="Address"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label josefin-sans-b" htmlFor="apartmentInput">
                        Apartment, suite, etc.
                      </label>
                      <div className="control">
                        <input
                          className="input josefin-sans"
                          value={apartmentInput}
                          type="text"
                          onChange={e => setApartmentInput(e.target.value)}
                          aria-label="Apartment, suite, etx."
                        />
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <div className="field">
                          <label className="label josefin-sans-b" htmlFor="cityInput">
                            City
                          </label>
                          <div className="control">
                            <input
                              className="input josefin-sans"
                              value={cityInput}
                              type="text"
                              onChange={e => setCityInput(e.target.value)}
                              aria-label="City"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label josefin-sans-b" htmlFor="countryInput">
                            Country
                          </label>
                          <div className="control">
                            <div className="select">
                              <select
                                className="josefin-sans"
                                value={countryInput}
                                onChange={e => setCountryInput(e.target.value)}
                                style={{ minWidth: "140px", maxWidth: "310px" }}
                              >
                                {countriesAll.map(country => (
                                  <option className="josefin-sans" value={country.name}>
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label josefin-sans-b" htmlFor="zipInput">
                        Postal/Zip Code
                      </label>
                      <div className="control">
                        <input
                          className="input josefin-sans"
                          value={zipInput}
                          type="text"
                          onChange={e => setZipInput(e.target.value)}
                          aria-label="Postal/Zip Code"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label josefin-sans-b" htmlFor="phoneInput">
                        Phone
                      </label>
                      <div className="control">
                        <input
                          className="input josefin-sans"
                          value={phoneInput}
                          type="text"
                          onChange={e => setPhoneInput(e.target.value)}
                          aria-label="Phone"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <label
                          className="checkbox josefin-sans-b"
                          htmlFor="checkboxDefaultAddress"
                        >
                          <input type="checkbox" />
                          Set as default address
                        </label>
                      </div>
                    </div>
                    <button
                      className="button is-dark josefin-sans-b"
                      onClick={() => {
                        customerAddressCreate({
                          variables: {
                            customerAccessToken:
                              customerAccessToken.accessToken,
                            address: {
                              address1: addressInput,
                              city: cityInput,
                              company: companyInput,
                              country: countryInput,
                              firstName: firstNameInput,
                              lastName: lastNameInput,
                              phone: phoneInput,
                              zip: zipInput
                            }
                          }
                        }).then(result => {
                          setAddAdressForm(!addAdressForm);
                        });
                      }}
                    >
                      Add adress
                    </button>
                    <p onClick={() => setAddAdressForm(!addAdressForm)} className="josefin-sans-b">
                      Cancel
                    </p>
                  </form>
                );
              }}
            </Mutation>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAddressForm;
