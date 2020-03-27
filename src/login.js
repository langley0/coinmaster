import React from "react";
import styled from "styled-components";

const LoginView = styled.div`
    width: 100%;
    height: 100%;
`;

const LoginButton = styled.div`
    width: 80%;
    height : 32px;
    line-height: 32px;
    vertical-align: middle;
    border: 2px #ddd sold;
    border-radius: 4px;
    top: 60%;
    left: 10%;
    text-align: center;
`;


export default class LoginComponent extends React.Component {
    render() {
        return (<LoginView>
            <LoginButton>LOGIN</LoginButton>
        </LoginView>);
    }
}