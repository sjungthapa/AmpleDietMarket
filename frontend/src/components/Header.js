import React from 'react';
import "../App.css";
import logo from "./Assets/brand1.png";
// import callicon from "./Assets/call icon.svg";
import { BiSearchAlt, BiUser } from 'react-icons/bi';
import { BsHeart, BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';



const Header = () => {
    return (
        <div className='header-container'>

            <div className='logo-search-cont'>
                <img src={logo} alt="" />
                <div className='search-cont'>
                    <BiSearchAlt className='icon' />
                    <input type="text" placeholder='Search Products' />
                </div>
            </div>

            <div className='contact-social-cont'>

                {/* <div className='contact'>
                    <img src={callicon} alt="" />
                    <p>Call Us <br /> <span>+009000000</span> </p>
                </div> */}

                <div className='social-icon-cont'>
                <div className='headerIcon'>
                <Link to="/login">
                <BiUser className='headerIcon-size' />
                </Link>
                </div>

                    <div className='headerIcon'>
                        <BsHeart className='headerIcon-size' />
                    </div>

                    <div className='headerIcon'>
                        <BsCart2 className='headerIcon-size' />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Header;
