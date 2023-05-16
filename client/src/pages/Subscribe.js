import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "../public/subscriberCard.css";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_SUBSCRIPTION } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

const Subscribe = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showStandard, setShowStandard] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const history = useHistory();

  const handleClose = () => {
    setShowBasic(false);
    setShowStandard(false);
    setShowPremium(false);
    setShowSuccess(false);
    history.push("/");
  };

  const [addSubscription, { error }] = useMutation(CREATE_SUBSCRIPTION);

  const { loading, data } = useQuery(GET_ME);

  const whichSubscription = async (subscriptionType) => {
    console.log(data);
    let type = "";
    if (subscriptionType === "basic") {
      type = "BASIC";
    } else if (subscriptionType === "standard") {
      type = "STANDARD";
    } else if (subscriptionType === "premium") {
      type = "PREMIUM";
    }
    try {
      if (!data) return;
      const { data: subscriptionData } = await addSubscription({
        variables: {
          userId: data.me._id,
          type: type,
          paymentStatus: "PAID",
        },
      });
      console.log(subscriptionData);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubscription = (subscriptionType) => {
    console.log(subscriptionType);
    if (subscriptionType === "basic") {
      setShowBasic(true);
      setShowSuccess(true);
    } else if (subscriptionType === "standard") {
      setShowStandard(true);
      setShowSuccess(true);
    } else if (subscriptionType === "premium") {
      setShowPremium(true);
      setShowSuccess(true);
    }
    whichSubscription(subscriptionType);
  };
  return (
    <Container className="subscribe-container">
      <div className="gradient-overlay"></div>
      <h1 class="headin-sub">Unlimited movies, TV shows, and more.</h1>
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
            <Card.Footer>Simultaneous streams: 1</Card.Footer>
          </Card>
        </Col>
        <Modal show={showSuccess && showBasic} onHide={handleClose} centered>
          <Modal.Body className="text-center">
            <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
            <h3>Thanks for subscribing to Basic subscription!</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
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
            <Card.Footer>Simultaneous streams: 2</Card.Footer>
          </Card>
        </Col>
        <Modal show={showSuccess && showStandard} onHide={handleClose} centered>
          <Modal.Body className="text-center">
            <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
            <h3>Thanks for subscribing to Standard subscription!</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Col md={4}>
          <Card
            className="subscribe-card shadow"
            onClick={() => handleSubscription("premium")}
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
            <Card.Footer>Simultaneous streams: 3</Card.Footer>
          </Card>
        </Col>
        <Modal show={showSuccess && showPremium} onHide={handleClose} centered>
          <Modal.Body className="text-center">
            <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
            <h3>Thanks for subscribing to Premium subscription!</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};
export default Subscribe;
