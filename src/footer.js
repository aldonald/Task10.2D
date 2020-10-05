import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Footer = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom">
        <Row style={{width: "100%"}}>
          <Col md={6}  sm={8} xs={12}>
            <Form inline className="mt-1">
              <label><h4 className="mr-3">NEWSLETTER SIGNUP</h4></label>
              <FormControl type="text" placeholder="Enter your email" className="mr-sm-2" />
              <Button variant="outline-primary">Subscribe</Button>
            </Form>
          </Col>
          <Col md={{ span: 3, offset: 3 }} sm={{ span: 5, offset: 3 }} xs={12} className="mt-3" style={{textAlign: "right"}}>
            <a className="mr-3" href="https://facebook.com/" ><img style={{height: "30px"}} src="images/fbook.png" alt="facebook logo" /></a>
            <a className="mr-3" href="https://twitter.com/explore"><img style={{height: "30px"}} src="images/twitter.png" alt="twitter logo" /></a>
            <a className="mr-3" href="https://www.linkedin.com/feed/"><img style={{height: "30px"}} src="images/lin.png" alt="linked in logo" /></a>
          </Col>

        </Row>
    </Navbar>
  )
}

export default Footer
