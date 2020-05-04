import React, { Fragment, useState } from "react";

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Button,
} from "reactstrap";

const Search = (props) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    props.setHashtag(input);
  };

  return (
    <Fragment>
      <Form>
        <Row>
          <Col md="12">
            <FormGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText style={{ fontSize: "1.5rem" }}>
                    #
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="type your hashtag"
                  type="text"
                  value={input}
                  onChange={handleChange}
                  className="font-weight-bold text-black-50"
                  style={{ fontSize: "1.5rem" }}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="ni ni-zoom-split-in" style={{ fontSize: "1.5rem" }} />
                  </InputGroupText>
                </InputGroupAddon>
                <Button
                  className="ml-3"
                  color="default"
                  type="submit"
                  onClick={handleClick}
                >
                  Search
                </Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default Search;
