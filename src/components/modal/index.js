import * as React from "react";
import styled from "styled-components";

const Background = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    background-color #0008;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
`

export default class Modal extends React.PureComponent {

    render() {
        const { children, onClick } = this.props;
        return (
        <Background onClick={onClick}>
            { children }
        </Background>
        )
    }
}