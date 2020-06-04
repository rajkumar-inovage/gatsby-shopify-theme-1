import React, { useState } from "react";
import SEO from "../../components/seo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import ConnexionLayout from "../../components/account/ConnexionLayout";
import { navigate } from "gatsby";

const CUSTOMER_REGISTER = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
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

const RegisterForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <section className="hero is-fullheight-with-navbar josefin-sans" style={{backgroundColor:'#e7e7e7'}}>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4 is-centered">
              <h2 className="josefin-sans-b title has-text-centered">Create</h2>
              <Mutation mutation={CUSTOMER_REGISTER}>
                {customerLogin => {
                  return (
                    <>
                      <div className="field">
                        <label
                          className="label text-dark josefin-sans-b"
                          htmlFor="loginEmail"
                        >
                          Email
                        </label>
                        <div className="control">
                          <input
                            className="input josefin-sans"
                            type="email"
                            id="loginEmail"
                            onChange={e => setEmail(e.target.value)}
                            aria-label="Email"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label
                          className="label text-dark josefin-sans-b"
                          htmlFor="loginPassword"
                        >
                          Password
                        </label>
                        <div className="control">
                          <input
                            className="input josefin-sans"
                            type="password"
                            id="loginPassword"
                            onChange={e => setPassword(e.target.value)}
                            aria-label="Password"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-text-centered">
                          <button
                            className="button josefin-sans-b overflow-hidden py-3 px-5 cart-btn border rounded-none out-line-none border-dark btns position-relative text-uppercase text-center"
                            onClick={() => {
                              customerLogin({
                                variables: {
                                  input: {
                                    email: email,
                                    password: password
                                  }
                                }
                              }).then(result => {
                                navigate(`/account/login`);
                              });
                            }}
                          >
                            CREATE
                          </button>
                        </div>
                      </div>
                    </>
                  );
                }}
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Register = () => {
  return (
    <>
      <SEO title="Register" />
      <ConnexionLayout log={false}>
        <RegisterForm />
      </ConnexionLayout>
    </>
  );
};

export default Register;
