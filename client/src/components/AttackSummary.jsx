import React from "react";

export default function AttackSummary({ text, onClick }) {
    return (
        <div className="modal">
            <div id="summary" className="flex-center">
                <div id="left">{ text }</div>
                <div id="right" className="flex-center" >
                    <button id="ok" onClick={onClick}> OK </button>
                </div>
            </div>
        </div>
    );
}