import React from "react";
import './Tile.css'

class Tile extends React.Component{
    render()
    {
        // console.log('ClassName ' + this.props.className)
        let val = this.props.val === '-1' ? '' : this.props.val
        return (
            <div className={this.props.className}
            onClick={() => this.props.onClick()}> 
                {val}
            </div>
        )
    }
}

export default Tile;



    // const [highlight, nohighlight] = React.useState("Yes");

    // constructor(props)
    // {
    //     super(props);
    //     this.state = {
    //         key: props.key,
    //         selected: false,
    //         row: -1,
    //         col: -1,
    //         set: -1,
    //         val: props.val,
    //         color: props.color
    //     }



    //     if (props.row === 2 || props.row === 5) {
    //         if (props.col === 2 || props.col === 5) {
    //             this.className = 'tileRowCol';
    //         }
    //         else {
    //             this.className = 'tileRow';
    //         }
    //     }
    //     else if (props.col === 2 || props.col === 5) {
    //         this.className = 'tileCol';
    //     }
    //     else {
    //         this.className = 'tile';
    //     }


    //     this.className = this.className + ' ' + this.props.color

    //     console.log('Color: ' + this.props.color)
    //     // this.getClick = this.getClick.bind(this);
    // }

    
    // onTileClick = () => {
    //     console.log(this.props)
    //     this.props.onTileClick()
    // }

    // componentWillReceiveProps(props) {
    //     this.setState({val: props.val})
    // }