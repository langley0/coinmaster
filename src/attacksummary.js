import React from "react";
import styled, { keyframes } from "styled-components";
import Modal from "./components/modal"
import Button from "./button";

const finishSlide = keyframes`
0% { top: 100% }
100% { top: 0; }
`

const FinishView = styled.div`
position: relative;
display: flex;
flex-direction: row;
align-items: center;

width: 90%;
height : 100px;

background-color: #555;

border: 2px solid #ddd;
border-radius: 10px;

animation: ${finishSlide} 1s 1;

`;

FinishView.Left = styled.div`
float: left;
width: 80%;
font-size: 20px;
padding: 10px;

`;

FinishView.Right = styled.div`
float: right;
width: 20%;
height: 40px;
padding: 10px;
`;

FinishView.Button = styled(Button)`
width: 100%;
height: 100%;
`
export default class AttackSummary extends React.Component {
    render() {
        const { text, onClick } = this.props;

        return (
        <Modal>
            <FinishView>
                <FinishView.Left>{ text }</FinishView.Left>
                <FinishView.Right>
                    <FinishView.Button onClick={onClick}> OK </FinishView.Button>
                </FinishView.Right>
            </FinishView>
        </Modal>
        );
    }
}