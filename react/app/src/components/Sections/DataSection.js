import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import DataChart from "../Layout/DataChart";
import TweetsData from "../Layout/DataCards";

export default function DataSection(props) {
  return (
    <Fragment>
      <Row>
        <Col>
          <DataChart data={props.data.counter} tag={props.tag} />
        </Col>
      </Row>
      <Row>
        <Col >
          <TweetsData data={props.data.tagged} />
        </Col>
      </Row>
    </Fragment>
  );
}
