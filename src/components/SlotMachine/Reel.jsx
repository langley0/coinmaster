import React from "react";

const symbols = [
    { label: "Battery", icon:"🔋"},
    { label: "Ascii Dollar", icon:"$"},
    { label: "Heavy Dollar Sign", icon:"💲"},
    { label: "Crossed Swords", icon:"⚔️"},
    { label: "Shield", icon:"🛡️"},
    { label: "Pig Face", icon:"🐷"},
]

export default class Reel extends React.Component {
    render () {
        const { top } = this.props;
        return (
        <div id="reel" style={{top}}> {
            [1,2,3].reduce((result) => {
                result = result.concat(symbols.map(item => 
                <div id="symbol" class="flex-center">
                    <span role="img" aria-label={item.label}>{item.icon}</span>
                </div>));
                return result;
            }, [])
        }
        </div>);
    }
}
