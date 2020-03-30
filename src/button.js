import styled from "styled-components";

export default styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    border: 2px #ddd solid;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        background: #ddd;
        color: #555;
    }

    &:active {
        transform: scale(0.9);
    }
`