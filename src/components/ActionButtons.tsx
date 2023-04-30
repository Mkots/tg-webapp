import React from 'react';
import {Button} from "react-bootstrap";

interface IProps{
    likesCount: number;
    dislikesCount: number;
    handleLike: () => void;
    handleDislike: () => void;
}
const ActionButtons: React.FC<IProps> = ({likesCount, dislikesCount, handleDislike, handleLike}) => {
 return (
     <div style={{
         display: "flex",
         justifyContent: "space-between"
     }}>
         <Button
             variant="primary"
             style={{
                 backgroundColor: "var(--tg-theme-button-color)",
                 color: "var(--tg-theme-button-text-color)",

             }}
             onClick={handleDislike}
         >👎: {dislikesCount}</Button>
         <Button
             variant="primary"
             style={{
                 backgroundColor: "var(--tg-theme-button-color)",
                 color: "var(--tg-theme-button-text-color)",
             }}
             onClick={handleLike}
         >👍: {likesCount}️</Button>
     </div>
 );
}

export default ActionButtons;