import React, { Fragment } from "react";
import { Table } from "reactstrap";
import {
  Card,
  CardText,
  CardTitle,
} from "reactstrap";

export default function Instruction() {
  return (
    <Fragment>
      <Card body outline color="default">
        <CardTitle className="font-weight-600">Instruction for Use</CardTitle>
        <CardText>
          <ul>
            <li>Input a Twitter hashtag <strong>(without #)</strong> and hit Enter</li>
            <li>
              Wait for the system to fetch 50 tweets and analyze sentiment
            </li>
            <li>
              The system will show General Sentiment, Positive/Negative Tweets,
              Chart Analysis
            </li>
          </ul>
        </CardText>
        <CardText className="ml-auto">
            <small className="mr-auto text-muted">
              Project by Yulong He, Haoran Chen, Henry Zhou, Samantha Han
            </small>
        </CardText>
      </Card>
      <Table hover className="mt-4">
    </Table>
    </Fragment>
  );
}
