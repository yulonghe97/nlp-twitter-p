import React, { Fragment, useState } from "react";
import { Row, Col } from "reactstrap";
import Search from "../Layout/Search";
import Instruction from "../Layout/Instruction";

export default function SearchSection(props) {

  const [hashtag, setHashtag] = useState('');
  
  // pass to the parent
  props.setHashtag(hashtag);

  return (
    <Fragment>
      <Row>
        <Col>
          <Search setHashtag={setHashtag} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Instruction />
        </Col>
      </Row>
    </Fragment>
  );
}
