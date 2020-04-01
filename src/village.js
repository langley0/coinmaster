import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Button from "./button";
import Intro from "./intro";
import STAGE from "./data/stage";

import { format } from "./utils";

const BUILDING_NAMES = ["HOUSE", "STATUE", "FIELD", "FARM", "BOAT"];
    
const Village = styled.div`
    position: absolute;
    width: 100%;
    height: 25%;
    top: 75%;

`

const PlayerName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px #ddd solid;
    border-radius: 20px;
    width: 60%;
    margin: auto;
    margin-top: 20%;

    font-size: 1.5rem;
    
`

const GoSlotButton = styled(Button)`
    width: 60%;
    margin: auto;
    margin-top: 3%;

    height: 5%;
    font-size: 1.2rem;
`

const BuildingContainer = styled.div`
    width: 80%;
    height: 55%;
    margin: auto;
    margin-top: 15%;
    
    padding: 3%;
`

const BuildingDiv = styled.div`
    position: relative;
    width: 100%;
    height: 20%;
    margin: 2px;

    border: 2px #ddd solid;
    border-radius: 4px;
`

const BuildingName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    float: left;
    width: 70%;
    height: 60%;
    font-size: 2rem;
    
`

const BuildingProgess = styled.div`
    float: left;
    width: 70%;
    height: 40%;
    font-size: 1.2rem;
    text-align: center;
`

const BuilidngPrice = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    width: 30%;
    height: 30%;
    right: 0;
    top: 0;
    
    font-size: 1 rem;
`

const BuilidngUp = styled(Button)`
    position: absolute;
    right: 2%;
    top: 40%;
    width: 25%;
    height: 35%;

`

class Building extends React.Component {
    getProgress(level) {
        if (level === 0) {
            return "○-○-○-○";
        } else if (level === 1) {
            return "●-○-○-○";
        } else if (level === 2) {
            return "●─●─○─○";
        } else if (level === 3) {
            return "●─●─●─○";
        } else {
            return "●─●─●─●";
        }
    }

    render() {
        const { name, level, price,onClick} = this.props;
        return (
        <BuildingDiv>
            <BuildingName>{ name }</BuildingName>
            <BuildingProgess>{ this.getProgress(level) }</BuildingProgess>
            <BuilidngPrice>{format(price)}</BuilidngPrice>
            <BuilidngUp onClick={onClick}>BUY</BuilidngUp>
        </BuildingDiv>

        );
    }
}

class VillageComponent extends React.Component {
    constructor(props)  {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onCloseIntro = this.onCloseIntro.bind(this);
    }

    onClick() {
        const { onChange } = this.props;
        if (onChange) {
            onChange();
        }
    }

    onCloseIntro() {
        // intro 를 끝내고 서버에 태깅을 한다
        const { player } = this.props;
        player.intro();
    }

    build(buildingIndex) {
        const { player } = this.props;
        player.build(buildingIndex);
    }

    render() {
        const { player } = this.props;
        const currentStage = STAGE[player.stage];

        return (
        <Village>
            <PlayerName>{player.name}</PlayerName>
            <GoSlotButton onClick={this.onClick}>▲Go SlotMachine</GoSlotButton>
            <BuildingContainer>
                {
                    currentStage.map((prices, index) => {
                        const level = player.buildings[index];
                        const name = BUILDING_NAMES[index];
                        const price = prices[level];
                        return <Building key={"building-" + index} name={name} level={level} price={price} onClick={()=> this.build(index)} />
                    })
                }
            </BuildingContainer>
            { player.justCreated 
                ? <Intro onClose={this.onCloseIntro}/> 
                : null
            }
        </Village>);
    }
}

export default inject("player")(observer(VillageComponent));