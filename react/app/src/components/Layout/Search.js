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

  const [input, setInput] = useState('');

  const handleChange = (e) =>{
    setInput(e.target.value);
  }
  const handleClick = (e) => {
    e.preventDefault();
    props.setHashtag(input);
  }

    return (
      <Fragment>
        <Form>
          <Row>
            <Col md="12">
              <FormGroup>
                <InputGroup className="mb-4">
                  <Input placeholder="type your #hashtag" type="text" value={input} onChange={handleChange} />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="ni ni-zoom-split-in" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Button className="ml-3" color="default" type="button" onClick={handleClick}>
                    Search
                  </Button>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );

}

export default Search;
