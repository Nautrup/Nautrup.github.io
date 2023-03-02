import React, { Component } from 'react';
import PageController from '../PageController';
import './NavbarStyle.css';

class Navbar extends Component {
    getPageNavigator(pageName) {
        return () => {
            PageController.goTo(pageName);
        }
    }
    render() {
        return (
            <>
            <nav>
                <a href="index.html">
                <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" class="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" class="ccustom" fill="#312ECB"></path> </svg>
                </a>

                <div id="navigation">
                    <ul id="menu">
                        <li><a className='active' href="#">Play</a>
                            <ul>
                                <li><a onClick={this.getPageNavigator('game')} href="#ranked">Ranked</a> </li> 
                                <li><a href="#">Challenge Friend</a> </li>
                            </ul>

                        </li>

                        <li><a href="#stats">Elo/Stats</a></li>
                        
                        <li><a href="#socials">Socials</a>
                            <ul>
                                <li><a onClick={this.getPageNavigator('friends')} href="#">Friends list</a> </li>
                                <li><a href="#">Add friend</a></li>
                            </ul>
                        </li>

                        <li><a href="#">Random space pictures</a></li>
                        <li><a href="#stats">Weather on mars</a></li>
                    </ul>
                </div>

            </nav>
            </>
        )
    }
}

export default Navbar;