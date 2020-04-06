import React from "react";
import Town from "./Town";
import SlotMachine from "./SlotMachine";

export default class Home extends React.Component {
    render() {
        const { mode } = this.props;
        return (
        <div id="home" className={ mode }>
            <Town />
            <SlotMachine />
        </div>);
    }
}