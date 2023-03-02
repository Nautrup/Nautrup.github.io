import React from "react";

import Tile from './Tile'
import './Board.css'


class EnemyBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: props.board
        }
    }

   
    renderTile(id, row, col, val, color)
    {
        let className = 'tile '
        if (row % 3 === 2 && col % 3 === 2) {
            className = 'tileRowCol '
        }
        else if (row % 3 === 2) {
            className = 'tileRow '
        }
        else if (col % 3 === 2) {
            className = 'tileCol '
        }
        else {
            className = 'tile '
        }

        className = className + color
        return(
            <Tile key={id} className={className} val={this.state.board[row][col]} onClick={() => this.doNothing()}/>
        )
    }

    doNothing() {
        console.log('xd')
    }

    renderTiles()
    {
        let key = 0;
        let tiles = [[],[],[],[],[],[],[],[],[]]
        for(let r = 0; r < 9; r++) {
            for(let c = 0; c < 9; c++) {

                let val = this.state.board[r][c] === '-1' ? '' : this.state.board[r][c]

                let color = (r + c) % 2 === 0 ? 'primary' : 'secondary'
                let font = 'fontstandard'
                

                tiles[r][c] = this.renderTile(key, r, c, val, color + ' ' + font)
                key++;
            }
        }

        return tiles
    }

    render() {
        return(
            <div className="container">
                <div className="Board">
                    {this.renderTiles()}
                </div>
            </div>
        )
    }
}

export default EnemyBoard;