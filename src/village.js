import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Button from "./button";

const Village = styled.div`
    position: absolute;
    width: 100%;
    height: 25%;
    left: 0px;
    top: 75%;

`

const PlayerName = styled.div`
    position: replative;
    border: 2px #ddd solid;
    border-radius: 20px;
    width: 60%;
    margin: auto;
    margin-top: 20%;
    
    vertical-align: middle;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
`

const GoSlotButton = styled(Button)`
    position: replative;

    width: 60%;
    margin: auto;
    margin-top: 3%;

    height: 40px;
    font-size: 20px;
`

const BuildingContainer = styled.div`
    position: replative;
    width: 80%;
    margin: auto;
    margin-top: 15%;
    
    padding: 3%;

    border: 2px #ddd solid;
    border-radius: 4px;
`

const BuildingDiv = styled.div`
    position: relative;
    width: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
`

const BuilidngName = styled.span`
    left: 0;
    font-size: 2rem;
`

const BuilidngUp = styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    width: 20%;
    height: 50%;
    text-align:center;
    border: 1px #ddd solid;
    border-radius: 4px;
`

const BuilidngPrice = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    text-align: right;
    font-size: 1rem;
`


class Building extends React.Component {
    render() {
        const { name, level, price} = this.props;

        return (<BuildingDiv>
            <BuilidngPrice>{ price }</BuilidngPrice>
            <BuilidngUp >BUY</BuilidngUp>
            <BuilidngName>{ name }</BuilidngName>
            <span> (LEVEL { level })</span>
            
            
        </BuildingDiv>

        );
    }
}

class VillageComponent extends React.Component {
    constructor(props)  {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.state = {
            buildings: [
                { name: "HOUSE", level: 1, price: 10000 },
                { name: "STATUE", level: 1, price: 10000 },
                { name: "FIELD", level: 1, price: 10000 },
                { name: "FARM", level: 1, price: 10000 },
                { name: "BOAT", level: 1, price: 10000 },
            ]
        }
    }

    onClick() {
        const { onChange } = this.props;
        if (onChange) {
            onChange();
        }
    }

    render() {
        const {buildings} = this.state;
        const { player } = this.props;
        return (
        <Village>
            <PlayerName>{player.name}</PlayerName>
            <GoSlotButton onClick={this.onClick}>▲Go SlotMachine</GoSlotButton>
            <BuildingContainer>
                {
                    buildings.map((item, index) => {
                        return <Building name={item.name} level={item.level} price={item.price}/>
                    })
                }
            </BuildingContainer>
        </Village>);
    }
}

export default inject("player")(observer(VillageComponent));