import React from 'react';
import {Card, Spinner} from "react-bootstrap";

interface IProps{
 isLoading: boolean;
 imgSrc?: string;
 setLoadedState: (isLoading: boolean) => void;
}
const CatImage: React.FC<IProps> = ({isLoading, imgSrc, setLoadedState}) => {
 return (
     <>
      <div
          className={isLoading ? "d-block" : "d-none"}
          style={{
           height: "50vh",
           textAlign: "center",
           paddingTop: "10%"
          }}>
       <Spinner animation="grow" style={{
        width: "15rem",
        height: "15rem",
        backgroundColor: "var(--tg-theme-secondary-bg-color)"
       }}/>
      </div>
     <Card.Img
         variant="top"
         className={isLoading ? "d-none" : "d-block"}
         src={imgSrc}
         style={{
          height: "50vh"
         }}
         onLoad={() => setLoadedState(false)}
     />
     </>
 );
}

export default CatImage;