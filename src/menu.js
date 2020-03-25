import React from "react";
import styled from "styled-components";


const MenuButton = styled.div`
    position: absolute;
    width: 48px;
    height: 48px;
    top :10px;
    left: -58px;
    border-radius: 4px;
    border: 2px white solid;
    background-color: rgb(205,82,25);
`;

const Menu = styled.div`
    position: absolute;
    top: 0;
    left: ${props => props.menuOpened ? "30%" : "100%"};
    width: 100%;
    height: 100%;
    transition: left 0.5s ${props => props.menuOpened ?"cubic-bezier(0.175, 0.885, 0.32, 1.275)":"ease-in-out"};
    border-left: 2px white solid;
    background: rgb(249,216,163);
`

const MenuTitle = styled.div`
    position: absolute;
    width: 120px;
    font-size: 32px;
    top: 20px;
    left: 60px;
    text-align: center;
    background: rgb(92,14,4)
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
    border-bottom: 2px rgb(229,192,140) solid;
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
]


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
        return <Menu menuOpened={menuOpened}>
            <MenuTitle>MENU</MenuTitle>
            <MenuContainer>
                {
                    menulist.map(item => <MenuItem>{item}</MenuItem>)
                }
            </MenuContainer>
            <MenuButton onClick={this.onClickMenu}></MenuButton>
        </Menu>;
    }
}