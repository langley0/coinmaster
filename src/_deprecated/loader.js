import * as React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

const beat = keyframes`
    50% {transform: scale(0.75);opacity: 0.50}
    75% {transform: scale(1);opacity: 1}
`;

const DotBox = styled.div`
    position: absolute;
    width: 100%;
    top: 40%;
`

const Dot = styled.div`
    display: inline-block;
    background-color: #ddd;
    width: 15px;
    height: 15px;
    margin: 2px;
    border-radius: 100%;
    animation: ${beat}  0.9S ${props => 0.3 * (props.i-1)}s infinite linear;
    animation-fill-mode: both;
`


const Background = styled.div`
    position: absolute;
    background-color #0008;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    text-align: center;
`

class Loader extends React.PureComponent {

    render() {
        const { env } = this.props;
        if (env.isLoading) {
            return (
            <Background>
                <DotBox>
                    <Dot i={1} />
                    <Dot i={2} />
                    <Dot i={3} />
                </DotBox>
            </Background>
            )
        } else {
            return null;
        }
    }
}

export default inject("env")(observer(Loader));