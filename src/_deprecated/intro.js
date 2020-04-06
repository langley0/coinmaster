import React from "react";
import styled from "styled-components";
import Modal from "../components/modal";

const IntroContainer = styled.div`
    position: absolute;
    width: 90%;
    height: 200px;
    background: #555;
    top: 20%;
    
    border: 2px solid #ddd;
    border-radius: 10px;
    pointer-events: none;
`;

const IntroTitle = styled.h2`
    text-align: center;
    margin: auto;
    margin-bottom: 50px;
`;

const IntroText = styled.h3`
    text-align: center;
`;

export default class Intro extends React.Component {
    render() {
        const { onClose } = this.props;
        return (
        <Modal onClick={onClose}>
            <IntroContainer>
                <IntroTitle>YOUR FIRST VILLAGE</IntroTitle>
                <IntroText>Welcome Friend !</IntroText>
                <IntroText>Click on the BUY button to build</IntroText>
            </IntroContainer>
        </Modal>
        )
    }
}
