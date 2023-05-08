import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "../public/subscriberCard.css";
// import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Subscribe = (e) => {
  // Use states
  const [showBasic, setShowBasic] = useState(false);
  const [showStandard, setShowStandard] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Add a state variable to control success message visibility

  // const history = useHistory();

  const handleClose = () => {
    setShowBasic(false);
    setShowStandard(false);
    setShowPremium(false);
  };

  // Define a function to handle subscription

  const handleSubscription = (subscriptionType) => {
    if (subscriptionType === "basic") {
      setShowBasic(true);
      setShowSuccess(true);
    } else if (subscriptionType === "standard") {
      setShowStandard(true);
      setShowSuccess(true);

      // } else if (subscriptionType === "premium") {
      //   setShowPremium(true);
      //   setShowSuccess(true);
      // }
    }
  };

  return (
    <Container className="subscribe-container">
      <div className="gradient-overlay"></div>
      <h1>Unlimited movies, TV shows, and more.</h1>
      <p>Choose the plan that's right for you.</p>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card
            className="subscribe-card"
            onClick={() => handleSubscription("basic")}
          >
            <Card.Header>
              <h3>Basic</h3>
              <h4>$8.99 / month</h4>
              <ul>
                <li>1. HD available ❌</li>
                <li>2. Ultra HD available ❌</li>
                <li>3. Screens you can watch on at the same time 1</li>
                <li>4. Watch on your laptop, TV. phone and tablet ✅</li>
                <li>5. Unlimited movies and TV shows ✅</li>
                <li>6. Cancel anytime ✅</li>
                <li>7. First month free ✅</li>
              </ul>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Watch on your laptop, TV, phone and tablet</li>
                <li>Unlimited movies and TV shows</li>
              </ul>
              <Button variant="danger" block>
                Subscribe
              </Button>
            </Card.Body>
            {/* <Card.Footer>Simultaneous streams: 1</Card.Footer> */}
          </Card>
        </Col>
        <Modal show={showSuccess} onHide={handleClose} centered>
          <Modal.Body className="text-center">
            <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
            <h3>Thanks for subscribing to Basic subscription!</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handleSubscription("basic");
                setShowBasic(true);
                setShowSuccess(true);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Col md={4}>
          <Card
            className="subscribe-card shadow"
            onClick={() => handleSubscription("standard")}
          >
            <Card.Header>
              <h3>Standard</h3>
              <h4>$13.99 / month</h4>
              <ul>
                <li>1. HD available ✅</li>
                <li>2. Ultra HD available ❌</li>
                <li>3. Screens you can watch on at the same time 2</li>
                <li>4. Watch on your laptop, TV. phone and tablet ✅</li>
                <li>5. Unlimited movies and TV shows ✅</li>
                <li>6. Cancel anytime ✅</li>
                <li>7. First month free ✅</li>
              </ul>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Watch on your laptop, TV, phone and tablet</li>
                <li>HD available</li>
                <li>Unlimited movies and TV shows</li>
              </ul>
              <Button variant="danger" block>
                Subscribe
              </Button>
            </Card.Body>
            {/* <Card.Footer>Simultaneous streams: 2</Card.Footer> */}
          </Card>
        </Col>
        <Modal show={showSuccess} onHide={handleClose} centered>
          <Modal.Body className="text-center">
            <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
            <h3>Thanks for subscribing to Standard subscription!</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handleSubscription("standard");
                setShowBasic(false);
                setShowSuccess(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Col md={4}>
          <Card
            className="subscribe-card shadow"
            onClick={() => handleSubscription("standard")}
          >
            <Card.Header>
              <h3>Premium</h3>
              <h4>$17.99 / month</h4>
              <ul>
                <li>1. HD available ✅</li>
                <li>2. Ultra HD available ✅</li>
                <li>3. Screens you can watch on at the same time 4</li>
                <li>4. Watch on your laptop, TV. phone and tablet ✅</li>
                <li>5. Unlimited movies and TV shows ✅</li>
                <li>6. Cancel anytime ✅</li>
                <li>7. First month free ✅</li>
              </ul>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Watch on your laptop, TV, phone and tablet</li>
                <li>HD and Ultra HD available</li>
                <li>Unlimited movies and TV shows</li>
              </ul>
              <Button variant="danger" block>
                Subscribe
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscribe;
