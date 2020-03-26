import React from "react";
import styled from "styled-components";

const Village = styled.div`
    position: absolute;
    width: 100%;
    height: 25%;
    left: 0px;
    top: 75%;

`

const GoSlotButton = styled.div`
    position: absolute;
    border: 2px #ddd solid;
    border-radius: 4px;

    width: 60%;
    top 12%;
    left: 20%;
    vertical-align: middle;
    font-size: 20px;
    line-height: 40px;
    text-align: center;

`

const BuildingContainer = styled.div`
    position: absolute;
    width: 80%;
    left: 7%;
    top: 25%;
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

export default class VillageComponent extends React.Component {
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
        return (<Village>
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