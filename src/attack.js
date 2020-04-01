import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Button from "./button";
import AttackSummary from "./attacksummary";

const Base = styled.div`
    width: 100%;
    height: 100%;
`
const Title = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: 40px;
    border-bottom: 2px solid #ddd;
    z-index: 2;
    padding: 10px;
    font-size: 1.2rem;
`

const TargetContainer = styled.div`
    position: relative;
    margin: 40% auto;
    width: 80%;
`

const Target = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: 50px;
    margin-bottom: 10px;

    border: 2px solid #ddd;
    border-radius: 10px;
`

Target.Left = styled.div`
    float: left;
    width: 70%;
    margin-left: 15px;
`

Target.Right = styled(Button)`
    float: right;
    width: 22%;
    height: 80%;
    margin: auto;
    border-radius: 100%;
    font-size: 10px;

    &:before {
        content: "ATTACK";
    }
`

const BUILDGINS = [
    "HOUSE",
    "STATUE",
    "FIELD",
    "FARM",
    "BOAT",
];

class Attack extends React.Component {
    constructor(props) {
        super(props);

        this.onAttack = this.onAttack.bind(this);
        this.backToGame = this.backToGame.bind(this);

        this.state = {
            stolen: 0,
            finished: false,
            confirm: false,
        }
    }

    backToGame() {
        const { env } = this.props;
        env.toHome();
    }

    finish() {
        this.setState({ confirm: true });
    }

    onAttack(index) {
        return () => {
            this.setState(prev => {
                let { stolen, finished } = prev;
                if (!finished) {
                    stolen += 10000;
                    finished = true;
                    
                    // 1초후에 모달을 띄운다
                    setTimeout(this.finish.bind(this), 1000);

                    return { stolen, finished };
                } else {
                    return null;
                }
            });
        }
    }

    renderSummary() {
        const { confirm } = this.state;
        if (confirm) {
            const summaryText = "You attacked Arturas's village and won 1,650,000";
            return <AttackSummary text={summaryText} onClick={this.backToGame}/> 
        } else {
            return null;
        }
    }

    render() {
        
        return (
        <Base>
            <Title>Amanada's village</Title>
            <TargetContainer>
            {
                BUILDGINS.map(building => (<Target>
                    <Target.Left>{building}</Target.Left>
                    <Target.Right onClick={this.onAttack(building)}></Target.Right>
                </Target>))
            }
            </TargetContainer>
            { this.renderSummary() }
        </Base>);
    }
}

export default inject("player", "env")(observer(Attack));