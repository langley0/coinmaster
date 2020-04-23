import React from "react";
import Town from "./Town";
import SlotMachine from "./SlotMachine";

export default function Home({ mode }) {
    return (
        <div className={ "home " + mode }>
            <Town />
            <SlotMachine />
        </div>
    );
}