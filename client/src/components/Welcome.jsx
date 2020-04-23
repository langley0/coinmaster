import React from "react";
/*
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
*/

export default class Welcome extends React.Component {
    render() {
        const { onClose } = this.props;
        return (
        <div className="modal" onClick={onClose}>
            <div id="welcome" className="flex-v">
                <div className="modal-title">YOUR FIRST VILLAGE</div>
                <div className="flex-v-center center">
                    <div className="modal-text">Welcome Friend !</div>
                    <div className="modal-text">Click on the BUILD button to build</div>
                </div>
            </div>
        </div>
        )
    }
}
