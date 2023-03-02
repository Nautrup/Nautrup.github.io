import React from "react";
import '../Friends.css';

const Friend = (props) => {
    console.log(props.name);
    return (
        <div className="friend">
            <h3>{props.name}</h3>
            <button className="friendRemove">
                {props.removeFriend}
            </button>
            <button className="friendChat">
                {props.chatFriend} 
            </button>
        </div>
    )
}

class FriendsList extends React.Component {
 

    render() {
        return (
            <div className="friend-list">
                <h2>Friends </h2>
                <Friend name='poopmaster37' removeFriend='Remove' chatFriend='Chat' />
                <Friend name='noobslayer420' removeFriend='Remove' chatFriend='Chat' />
                <Friend name='hoaxguy123' removeFriend='Remove' chatFriend='Chat' />
                <Friend name='poopmaster37' removeFriend='Remove' chatFriend='Chat' />
            </div>
        )
            
    }
}

export default FriendsList;