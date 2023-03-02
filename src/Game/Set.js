import React, { Component } from "react";

import Tile from './Tile'


class Set extends React.Component {
    constructor(props)
    {
        super(props);


        this.state = {
            row: props.row,
            col: props.col,
            val: props.val,
            tiles: Array(9).fill(null)
        }
        console.log(this.state.row + ',' + this.state.col);
        console.log('Val ' + this.state.val);
        



        // let tileArr = new Array(9);

        // tileArr.forEach(tile => {
            
        // });
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(row, col) {
        console.log(row);
        console.log(col);

        // tiles[3]
        
    }


    createTile() {
    }

    
    renderTile(row, col, val)
    {
        let rnd = Math.floor(Math.random() * 10);

        return(
            <Tile row={row} col={col} val={val} set={this.state.val} onTileClick={() => this.handleClick(row, col)}/>
        )
    }


    render() {
        return(
            <div>
                <div className="Set1">
                    {this.renderTile(0, 0, this.state.tiles[0])}
                    {this.renderTile(0, 1, this.state.tiles[1])}
                    {this.renderTile(0, 2, this.state.tiles[2])}
                </div>
                <div className="Set2">
                    {this.renderTile(1, 0, this.state.tiles[3])}
                    {this.renderTile(1, 1, this.state.tiles[4])}
                    {this.renderTile(1, 2, this.state.tiles[5])}
                </div>
                <div className="Set3">
                    {this.renderTile(2, 0, this.state.tiles[6])}
                    {this.renderTile(2, 1, this.state.tiles[7])}
                    {this.renderTile(2, 2, this.state.tiles[9])}
                </div>
            </div>
        )
    }
}

export default Set;