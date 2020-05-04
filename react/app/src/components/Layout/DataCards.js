import React from "react";
import {
  Card,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody,
  Badge,
} from "reactstrap";

const badgeSetting = (tag) => {
  switch (tag) {
    case "POSITIVE":
      return "success";
    case "NEGATIVE":
      return "danger";
    case "NEUTRAL":
      return "secondary";
    default:
      return "secondary";
  }
};


const TweetsData = (props) => {

  let tweetData = [];

  if (props.data) {
    tweetData = props.data.map((ele, index) => {
      return (
        <Card className='data-card' key={index}>
          <CardBody >
            <CardSubtitle className="py-2">
              <Badge href="#" color={badgeSetting(ele.tag)}>
                {ele.tag}
              </Badge>
            </CardSubtitle>
            <CardText>{ele.tweet}</CardText>
          </CardBody>
        </Card>
      );
    });
  }

  return (
    <div className="container mt-5 mb-5">
      <h5>Related Tweets</h5>
      <hr />
      <CardColumns>{tweetData}</CardColumns>
    </div>
  );
};

export default TweetsData;
