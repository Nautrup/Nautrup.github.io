import React, { Component } from "react";

import './Board.css'
import Tile from './Tile'


class Selector extends React.Component {
    constructor(props)
    {
        super(props);

        console.log('Selector ran')
    }

    renderTile(row, col, val)
    {
        let rnd = Math.floor(Math.random() * 10);

        return(
            <Tile row={row} col={col} val={val} set={-1}/>
        )
    }


    render() {
        return(
            <div className="Selector">
                <div className="Set1">
                    {this.renderTile(0, 0, 1)}
                    {this.renderTile(0, 1, 2)}
                    {this.renderTile(0, 2, 3)}
                </div>
                <div className="Set2">
                    {this.renderTile(1, 0, 4)}
                    {this.renderTile(1, 1, 5)}
                    {this.renderTile(1, 2, 6)}
                </div>
                <div className="Set3">
                    {this.renderTile(2, 0, 7)}
                    {this.renderTile(2, 1, 8)}
                    {this.renderTile(2, 2, 9)}
                </div>
            </div>
        )
    }
}

export default Selector;