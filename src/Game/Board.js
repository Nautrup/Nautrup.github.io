import React from "react";

import Tile from './Tile'
import './Board.css'
import bomb from './bomb.png'


class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: props.board,
            OGBoard: props.OGBoard,
            numSelected: '',
            selectedRow: -1,
            selectedCol: -1,
            bDidInit: false,
            powerups: 0
        }
        this.helpers = {
            highlightC1: -1,
            highlightC2: -1,
            highlightR1: -1,
            highlightR2: -1,
        }
        this.selectTile = this.selectTile.bind(this);
    }

    hightlightSet(r, c)
    {
        if(r % 3 === 0) {
            this.helpers.highlightR1 = r+1;
            this.helpers.highlightR2 = r+2;
        }
        else if (r % 3 === 1) {
            this.helpers.highlightR1 = r-1;
            this.helpers.highlightR2 = r+1;
        }
        else if (r % 3 === 2) {
            this.helpers.highlightR1 = r-1;
            this.helpers.highlightR2 = r-2;
        }
        if(c % 3 === 0) {
            this.helpers.highlightC1 = c+1;
            this.helpers.highlightC2 = c+2;
        }
        else if (c % 3 === 1) {
            this.helpers.highlightC1 = c-1;
            this.helpers.highlightC2 = c+1;
        }
        else if (c % 3 === 2) {
            this.helpers.highlightC1 = c-1;
            this.helpers.highlightC2 = c-2;
        }

        console.log(this.helpers.highlightR1)
        console.log(this.helpers.highlightR2)
    }

    checkProblem(row, col, val) {
        let problem = false;
        for(let r = 0; r < 9; r++)
        {
            for(let c = 0; c < 9; c++) {
                if(row === r && col === c) {
                    
                }
                
                else if(row === r || col === c) {
                    if(this.state.board[r][c] === val) {
                        problem = true;
                    }
                    // if(this.helpers.highlightC1 !== -1 && this.helpers.highlightC2 !== -1) {
                    //     if(this.state.board[r][this.helpers.highlightC1] === val || this.state.board[r][this.helpers.highlightC2] === val) {
                    //         problem = true;
                    //     }
                    // } 
                    // if(this.helpers.highlightR1 !== -1 && this.helpers.highlightR2 !== -1) {

                    //     if(this.state.board[this.helpers.highlightR1][c] === val || this.state.board[this.helpers.highlightR2][c] === val) {
                    //         problem = true;
                    //     }
                    // }
                }
            }
        }

        return problem;
    }

    checkProblem2(row, col, val) {
        let problem = false;

        // let board = this.state.board.slice();

        

        return problem;
    }

    isOG(row, col) {
        if (this.state.OGBoard[row][col] !== '-1') {
            return true;
        }
        return false;
    }
    isBoardFull() {
        let bIsFull = true;
        for(let r = 0; r < 9; r++) {
            for(let c = 0; c < 9; c++) {
                if(this.state.board[r][c] === '-1')
                {
                    bIsFull = false;
                }
            }
        }

        return bIsFull;
    }

    isRowFull(row) {
        let bIsFull = true;
        for(let r = 0; r < 9; r++) {
            for(let c = 0; c < 9; c++) {
                if(r === row) {
                    if(this.state.board[r][c] === '-1')
                    {
                        bIsFull = false;
                    }
                }
            }
        }

        return bIsFull;
    }

    isColFull(col) {
        let bIsFull = true;
        for(let r = 0; r < 9; r++) {
            for(let c = 0; c < 9; c++) {
                if(c === col) {
                    if(this.state.board[r][c] === '-1')
                    {
                        bIsFull = false;
                    }
                }
            }
        }

        return bIsFull;
    }
    
    selectTile(row, col) {

        this.hightlightSet(row, col)
        console.log('Selected: r' + row + ' c' + col)
        this.state.selectedCol = col;
        this.state.selectedRow = row;
        let board = this.state.board.slice();
        let powerups = this.state.powerups;

        if(this.state.OGBoard[row][col] !== '-1') {
        }
        else {
            board[row][col] = this.state.numSelected === '' ? board[row][col] : this.state.numSelected;

            if (this.state.numSelected === 10) {
                board[row][col] = '';
            }
        }

        if(this.isRowFull(row)) {
            
            if (powerups === 6) {
                alert('You are already at the maximum number of powerups buddy!')
            }
            else {

                powerups++;
                alert('You gained a powerup! EXTREME')
                console.log(this.state.powerups)
            }
        }
        if(this.isColFull(col)) {
            if (powerups === 6) {
                alert('You are already at the maximum number of powerups buddy!')
            }
            else {

                powerups++;
                alert('You gained a powerup! EXTREME')
                console.log(this.state.powerups)
            }
        }
        if(this.isBoardFull()) {
            alert('You win!!!')
        }

        this.setState({
            board: board,
            powerups: powerups
        })

    }

    selectSelector(i) {
        console.log('Selected: ' + i);
        this.state.numSelected = i;

        this.setState({
            numSelected: i
        })
        if(this.state.selectedRow !== -1 && this.state.selectedCol !== -1) {
            this.selectTile(this.state.selectedRow, this.state.selectedCol)
        }


        console.log(this.state.numSelected)
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
            <Tile key={id} className={className} val={this.state.board[row][col]} onClick={() => this.selectTile(row, col)}/>
        )
    }

    renderSelectorTile(id, val, color) {
        let className = 'tile ' + color
        if (val === 10) {
            val = '-1';
        }
        return(
            <Tile key={id} className={className} val={val} onClick={() => this.selectSelector(val)}/>
        )
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
                
                let isOG = this.isOG(r, c)
                let isProblem = this.checkProblem(r, c, val)

                if(isOG) {

                    // console.log('Row: ' + r + ' Col: ' + c + ' Problem: ' + isProblem + ' IsOG?: ' + isOG + ' VAL ' + val)
                }

                if(isProblem) {
                    font = 'fontproblem'
                    if(isOG) {
                        font = 'fontlocked'
                        color = 'problem' 
                    }
                } 
                else if(isOG) {
                    font = 'fontlocked'
                }
            
                if(this.state.selectedCol === c) {
                    if(isProblem && isOG) {
                        console.log('problem')
                        color = 'problem';
                    } else {
                        color = 'highlight'
                    }
                }
                if(this.state.selectedRow === r) {
                    if(isProblem && isOG) {
                        console.log('problem')
                        color = 'problem';
                    } else {
                        color = 'highlight'
                    }
                }

                if((this.helpers.highlightR1 === r || this.helpers.highlightR2 === r) && (this.helpers.highlightC1 === c || this.helpers.highlightC2 === c)) {
                    color = 'highlight'
                } 

                if(this.state.selectedCol === c && this.state.selectedRow === r) {
                    color = 'selected'
                }

                tiles[r][c] = this.renderTile(key, r, c, val, color + ' ' + font)
                key++;
            }
        }

        return tiles
    }


    renderSelector()
    {
        let tiles = []
        for (let i = 1; i < 11; i++) {
            let color = (i) % 2 === 0 ? 'primary' : 'secondary'
            if(this.state.numSelected === i) {
                color = 'selected'
            }
            if (this.state.numSelected === '-1' && i === 10) {
                color = 'selected'
            }
            tiles[i] = this.renderSelectorTile(i, i, color)
        }
        
        return tiles;
    }

    renderPowerup() {
        return(
            <img src={bomb} alt="bomb" className="powerup"></img>
        )
    }

    renderPowerups() {
        let pups = []
        for(let i = 0; i < this.state.powerups; i++) {
            pups.push(this.renderPowerup())
        }

        return pups;
    }

    
    // calculateSetVal = (row, col) => {
    //     if(row === 0) {
    //         if (col === 0) {
    //             return 0;
    //         }
    //         if (col === 1) {
    //             return 1;
    //         }
    //         if (col === 2) {
    //             return 2;
    //         }
    //     }
    //     if (row === 1) {
    //         if (col === 0) {
    //             return 3;
    //         }
    //         if (col === 1) {
    //             return 4;
    //         }
    //         if (col === 2) {
    //             return 5;
    //         }
    //     }
    //     if (row === 2) {
    //         if (col === 0) {
    //             return 6;
    //         }
    //         if (col === 1) {
    //             return 7;
    //         }
    //         if (col === 2) {
    //             return 8;
    //         }
    //     }

        
    // }

    render() {
        return(
            <div className="container">
                <div className="Board">
                    {this.renderTiles()}
                </div>
                <div className="BoardPart">
                    {this.renderSelector()}
                </div>
                <div className="powerups"> 
                    {this.renderPowerups()}
                </div>
            </div>
        )
    }
}

export default Board;