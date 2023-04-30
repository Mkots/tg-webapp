import React from 'react';
import {Card, Placeholder} from "react-bootstrap";
import {QuoteResponse} from "../api/types";

interface IProps{
    isLoading: boolean;
    data?: QuoteResponse
}
const Quote: React.FC<IProps> = ({isLoading, data}) => {
 return (
  <>
      {isLoading && (
          <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
      )}
      {data && (
          <Card.Text key={data.id}>
              {data.quote} - {data.author}
          </Card.Text>
      )}
  </>
 );
}

export default Quote;