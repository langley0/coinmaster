import React from "react";
import styled from "styled-components";


const MenuButton = styled.div`
    position: absolute;
    width: 48px;
    height: 48px;
    top :10px;
    left: -58px;
    border-radius: 4px;
    border: 2px #ddd solid;
    
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
    
    &:before {
        font-size: 1rem;
        content: "menu";
    }
`;

const Menu = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    border-left: 2px white solid;
`

const MenuTitle = styled.div`
    position: absolute;
    width: 120px;
    font-size: 32px;
    top: 20px;
    left: 60px;
    text-align: center;
    border: 2px #ddd solid;
    border-radius: 4px;
`;

const MenuContainer = styled.div`
    position: absolute;
    color: white;
    width: 100%;
    top: 80px;
    left: 40px;
`

const MenuItem = styled.div`
    padding-top: 12px;
    padding-bottom: 8px;
    border-bottom: 2px #ddd solid;
    font-size: 16px;
`

const menulist = [
    "PLAY",
    "VILLAGE",
    "BUY COINS/SPINS",
    "VILLAGE SHOP",
    "VILLAGE NEWS",
    "GIFT",
    "CARD COLLECTION",
    "MAP",
    "LEADERBOARD",
    "INVITE FRIENDS",
    "ACHIEVEMENTS",
    "SETTINGS",
];

const UIBase = styled.div`
    position: absolute;
    width: 200%;
    height: 100%;
    top: 0px;
    left: ${props => props.menuOpened ? "-70%" : "0"};
    transition: left 0.5s ${props => props.menuOpened ?"cubic-bezier(0.175, 0.885, 0.32, 1.275)":"ease-in-out"};
`

const UIGold = styled.div`
    position: absolute;
    width : 150px;
    height: 40px;
    vertical-align: middle;
    line-height: 40px;
    font-size: 20px;
    padding-right: 8px;
    border: 2px #ddd solid;
    border-radius: 4px;
    text-align: right;
    left: 8px;
    top: 8px;
`

const UIStar = styled.div`
    position: absolute;
    font-size: 20px;
    width: 40px;
    font-size: 32px;

    &:before {
        content: "★";
    }

    top: 4px;
    left: 174px;
`

const UIShield = styled.div`
    position: absolute;
    font-size: 20px;
    width: 40px;
    font-size: 32px;

    &:before {
        content: "○";
    }

    top: 4px;
    left: 210px;
`

export default class MenuComponent extends React.Component {
    constructor() {
        super();

        this.state = { menuOpened: false}

        this.onClickMenu = this.onClickMenu.bind(this);
    }

    onClickMenu() {
        this.setState(prev => {
            return { menuOpened: !prev.menuOpened };
        })
    }

    render() {
        const { menuOpened } = this.state;
        const { children } = this.props;
        return (
        <UIBase menuOpened={menuOpened}>
            {   children }
            <Menu >
                <MenuTitle>MENU</MenuTitle>
                <MenuContainer>
                    {
                        menulist.map(item => <MenuItem key={"menu-"+item}>{item}</MenuItem>)
                    }
                </MenuContainer>
                <MenuButton onClick={this.onClickMenu}></MenuButton>
            </Menu>
            <UIGold >44,000G</UIGold>
            <UIStar/>
            <UIShield/>
        </UIBase>);
    }
}