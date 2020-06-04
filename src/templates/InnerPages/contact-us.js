import React from 'react'
import { graphql, Link } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import SEO from '~/components/seo'
import ReactHtmlParser from 'react-html-parser'

const InnerPages = ({ data }) => {
  return (
    <>
      <SEO title="Contact Us" />
      <section
        className="inner-pages-banner py-100"
        style={{ backgroundColor: '#e7e7e7' }}
      >
        <Container className="py-0 py-lg-5">
          <Row className="mx-0">
            <Col className="banner-data text-center col-12 mt-5">
              <div
                className="breadcrump josefin-sans"
                style={{ fontSize: '1.3rem' }}
              >
                <span>
                  {' '}
                  <Link
                    to="/"
                    style={{ textDecoration: 'none' }}
                    className="text-dark"
                  >
                    {' '}
                    Home
                  </Link>{' '}
                </span>{' '}
                / <span> {data.shopifyPage.title}</span>
              </div>
              <div className="collection-title mt-4 d-inline-flex">
                <h1
                  className="m-0 josefin-sans-b"
                  style={{
                    fontSize: '2.5rem',
                    color: '#000',
                    lineHeight: '24px',
                  }}
                >
                  {data.shopifyPage.title}
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-3 py-lg-5">
        <Container>
          <Row className="mx-auto col-12 col-lg-10 contact-data">
              
              {ReactHtmlParser(data.shopifyPage.body)}
          </Row>
          <Row className="mx-0 mx-md-auto col-12 col-lg-10 mt-3 mt-lg-5 contact-page-form">
            <Col className="col-12 px-0">
              <iframe
                title="Contact Form"
                className="w-100 overflow-hidden"
                src="//contactform.hulkapps.com/corepage/contact?id=30cb8ebe6bfcfe7b92f639"
                frameBorder="0"
                style={{ minHeight: '500px' }}
              />

            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
export const query = graphql`
  query($handle: String!) {
    shopifyPage(handle: { eq: $handle }) {
      title
      handle
      body
    }
  }
`

export default InnerPages
