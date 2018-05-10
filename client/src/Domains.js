import React, { Component } from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Col,
  Collapse,
  Fade,
  Row
} from "reactstrap";

class Domains extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  <a
                    className="card-header-action btn btn-minimize"
                    data-target="#collapseDomains"
                    onClick={this.toggle}
                  >
                    <i className="fa fa-align-justify" />
                  </a>
                  CANS: Domains
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">
                      <i className="icon-settings" />
                    </a>
                    <a
                      className="card-header-action btn btn-minimize"
                      data-target="#collapseDomains"
                      onClick={this.toggle}
                    >
                      <i className="icon-arrow-up" />
                    </a>

                    <a
                      className="card-header-action btn btn-close"
                      onClick={this.toggleFade}
                    >
                      <i className="icon-close" />
                    </a>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseDomains">
                  <CardBody>
                    <div>
                    <Card><CardHeader>1. Behavioral/Emotional Needs</CardHeader></Card>
                    <Card><CardHeader>2. Life Functioning</CardHeader></Card>
                    <Card><CardHeader>3. Risk Behaviors</CardHeader></Card>
                    <Card><CardHeader>4. Cultural Factors</CardHeader></Card>
                    <Card><CardHeader>5. Strengths</CardHeader></Card>
                    <Card><CardHeader>6. Caregiver Resources and Needs</CardHeader></Card>
                    <Card><CardHeader>7. Potentially Traumatic/Adverse Childhood Experiences</CardHeader></Card>
                    <Card><CardHeader>8. Early Childhood Domain (0-5 years old)</CardHeader></Card>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
            </Fade>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Domains;
