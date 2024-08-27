import React, { useState, useEffect, useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ModeContext } from '../../context/Mode';
import { CiStar } from 'react-icons/ci';
import { FontsContext } from '../../context/Fonts';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import supabase from '../../tools/config/connect';
import { motion } from 'framer-motion';

const Account = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-user', 'admin-token']);
    const { token } = useParams();
    const user = useSelector(state => state.user);
    const [filterUsers, setFilterUsers] = useState([]);
    const [mode, setMode] = useContext(ModeContext);
    const [fonts, setFonts] = useContext(FontsContext);
    const [order, setOrder] = useState(false);
    const [edit, setEdit] = useState(false);

    const imageLink = useRef();
    const fullname = useRef();
    const lastname = useRef();
    const email = useRef();

    useEffect(() => {
        setFilterUsers(user);
    }, [user]);

    const filterUsersInformation = filterUsers.find(item => item.user_token === token) || {};

    const handleClick = (newMode) => {
        const newClass = mode === 'bodyBgColor' ? newMode : 'bodyBgColor';
        setMode(newClass);
        localStorage.setItem('mode', newClass);
    };

    const handleClickFonts = (newFonts) => {
        const newFont = fonts === 'bodyMainFonts' ? newFonts : 'bodyMainFonts';
        setFonts(newFont);
        localStorage.setItem('fonts', newFont);
    };

    const toggleOrderContent = () => {
        setOrder(!order);
    };

    const toggle = () => {
        setEdit(!edit);
    };

    const checkData = async () => {
        try {
            const { data, error } = await supabase.from('Users').select();
            if (error) throw error;

            const userData = data.find(item => item.user_token === cookies['cookie-user']);
            if (!userData) throw new Error('User not found');

            const { error: updateError } = await supabase.from('Users').update({
                image: imageLink.current.value,
                fullname: fullname.current.value,
                lastname: lastname.current.value,
                email: email.current.value,
            }).eq('user_token', cookies['cookie-user']);

            if (updateError) throw updateError;

            alert('Data updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('An error occurred while updating data');
        }
    };

    return (
        <div>
            <div className='account-elements'>
                <div className='container'>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4">
                            <div className="card">
                                <div className="account-left-side">
                                    <div className='edit-button-div mt-3 me-3'>
                                        {edit ?
                                            <button className="Btn" onClick={() => { checkData(); }}>Submit
                                                <svg className="svg" viewBox="0 0 512 512">
                                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                                            </button> :
                                            <button className="Btn" onClick={toggle}>Edit
                                                <svg className="svg" viewBox="0 0 512 512">
                                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                                            </button>
                                        }
                                    </div>
                                    <div className="card-body">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.5,
                                                ease: [0, 0.71, 0.2, 1.01]
                                            }}
                                            className='users-logo text-center'>
                                            <img src={edit ? 'https://as1.ftcdn.net/v2/jpg/02/89/49/22/1000_F_289492257_augSIlCtit7AQhCZQwYPF1X1XgtwwJkN.jpg' : filterUsersInformation.image} alt="User" />
                                        </motion.div>
                                        <div className='user-form-information mt-3'>
                                            {edit ?
                                                <form>
                                                    <input type="text" placeholder='new image link' className='mb-2' ref={imageLink} />
                                                    <input type="text" placeholder='fullname@gmail.com' className='mb-2' ref={fullname} />
                                                    <input type="text" placeholder='lastname@gmail.com' className='mb-2' ref={lastname} />
                                                    <input type="text" placeholder='email@gmail.com' className='mb-2' ref={email} />
                                                    <input type="password" placeholder='**********' className='mb-2' disabled />
                                                </form> :
                                                <form>
                                                    <input type="text" placeholder={filterUsersInformation.fullname || 'Fullname'} className='mb-2' disabled />
                                                    <input type="text" placeholder={filterUsersInformation.lastname || 'Lastname'} className='mb-2' disabled />
                                                    <input type="text" placeholder={filterUsersInformation.email || 'Email'} className='mb-2' disabled />
                                                    <input type="password" placeholder='**********' className='mb-2' disabled />
                                                </form>}
                                            <div>
                                                <div className='order-div'>
                                                    <div className='order-button-div' onClick={toggleOrderContent}>
                                                        <button className='order-button'>Order</button>
                                                        <span><i class="fa-solid fa-caret-down"></i></span>
                                                    </div>
                                                    <div>
                                                        {order ?
                                                            <div className='order-content our'>
                                                                Order
                                                            </div> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-8">
                            <div className="card">
                                <div className='account-right-side'>
                                    <div className="card-body">
                                        <div className='user-config-website'>
                                            <h4 className='text-center mb-4'>Change bgColor</h4>
                                            <div className='bg-color-buttons'>
                                                <ul>
                                                    <li className='list-group-item'>
                                                        <button className='red' onClick={() => handleClick('changeBgColorRed')}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='blue' onClick={() => handleClick('changeBgColorBlue')}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='orange' onClick={() => handleClick('changeBgColorOrange')}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='white' onClick={() => handleClick('changeBgColorWhite')}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='purple' onClick={() => handleClick('changeBgColorPurple')}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='brown' onClick={() => handleClick('changeBgColorBrown')}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='yellow' onClick={() => handleClick('changeBgColorYellow')}></button>
                                                    </li>
                                                </ul>
                                            </div>

                                            <h4 className='text-center mt-4'>Change Font Family</h4>
                                            <div className='fonts-config-website mt-4'>
                                                <ul>
                                                    <li className='list-group-item'>
                                                        <button className='zen-dots' onClick={() => handleClickFonts('zen-dots')}>Default (zen dots)</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='koulen-font' onClick={() => handleClickFonts('koulen-font')}>Koulen</button>
                                                        <span><CiStar className='star' style={{
                                                            color: 'black'
                                                        }} /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='bungee-font' onClick={() => handleClickFonts('bungee-font')}>Bungee</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='foldit-font' onClick={() => handleClickFonts('foldit-font')}>Foldit</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='chakra-font' onClick={() => handleClickFonts('chakra-font')}>Chakra</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='righteous-font' onClick={() => handleClickFonts('righteous-font')}>Righteous</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='audiowide-font' onClick={() => handleClickFonts('audiowide-font')}>Audiowide</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='slackey-font' onClick={() => handleClickFonts('slackey-font')}>Slackey</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='gruppo-font' onClick={() => handleClickFonts('gruppo-font')}>Gruppo</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='novaRound-font' onClick={() => handleClickFonts('novaRound-font')}>Nova Round</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='akaya-font' onClick={() => handleClickFonts('akaya-font')}>Akaya Telivigala</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='rubikWet-font' onClick={() => handleClickFonts('rubikWet-font')}>Rubik Wet Paint</button>
                                                        <span><CiStar className='star' /></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
