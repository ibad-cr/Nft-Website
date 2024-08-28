import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CiHeart, CiLogout, CiUser } from 'react-icons/ci';
import { PiShoppingCartThin } from 'react-icons/pi';
import { LiaUserSolid } from 'react-icons/lia';
import { useCookies } from 'react-cookie';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import supabase from '../tools/config/connect';
import slugify from 'slugify';
import { useParams } from 'react-router-dom';

const Navbar = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-user', 'admin-token']);
    const location = useLocation();
    const isShopPage = location.pathname === '/shop';

    const toggleSearch = () => {
        setOpenSearch(!openSearch);
        setOpenNav(false);
    };

    const toggleNav = () => {
        setOpenNav(!openNav);
        setOpenSearch(false);
    };

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const dropdownRefs = useRef([]);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (dropdownRefs.current.every(ref => ref && !ref.contains(event.target))) {
            setOpenDropdownIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const user = useSelector(state => state.user);
    const [filterUsers, setFilterUsers] = useState([]);
    useEffect(() => {
        setFilterUsers(user);
    }, [user]);

    const filterUsersInformation = filterUsers.length === 0 ? '' : filterUsers.find(item => item.user_token === cookies['cookie-user']);


    const [basketNavbarQuantity, setBasketNavbarQuantity] = useState(0);

    const fetchBasketData = async () => {
        const { data, error } = await supabase.from('Basket').select();

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        const filterBasketData = data.filter(item => item.basket_user_token === cookies['cookie-user']);

        const totalQuantity = filterBasketData.reduce((acc, item) => {
            const quantities = item.products ? item.products.map(product => product.quantity || 0) : [0];
            const totalProductQuantity = quantities.reduce((sum, quantity) => sum + quantity, 0);

            return acc + totalProductQuantity;
        }, 0);

        console.log('Total Quantity:', totalQuantity);
        setBasketNavbarQuantity(totalQuantity);
    };

    useEffect(() => {
        fetchBasketData();
    }, [cookies['cookie-user']]);

    useEffect(() => {
        const channel = supabase.channel('basket-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'Basket' }, payload => {
                fetchBasketData();
            })
            .subscribe();

        return () => {
            channel.unsubscribe();
        };

    }, [cookies['cookie-user']]);


    const [wishlist, setWishlistNavbarQuantity] = useState(0);

    const wishlistFetchData = async () => {
        const { data, error } = await supabase.from('Wishlist').select();

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        const filterWishlistData = data.filter(item => item.wishlist_user_token === cookies['cookie-user']);

        const totalWishlistQuantity = filterWishlistData.reduce((acc, item) => {
            const wishlistQuantities = item.wishlist_products ? item.wishlist_products.map(product => product.quantity || 0) : [0];
            const totalWishlistProductQuantity = wishlistQuantities.reduce((sum, quantity) => sum + quantity, 0);

            return acc + totalWishlistProductQuantity;
        }, 0);

        console.log('Total Wishlist Quantity:', totalWishlistQuantity);
        setWishlistNavbarQuantity(totalWishlistQuantity);
    }

    useEffect(() => {
        wishlistFetchData();
    }, [cookies['cookie-user']]);

    useEffect(() => {
        const channel = supabase.channel('wishlist-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'Wishlist' }, payload => {
                wishlistFetchData();
            })
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [cookies['cookie-user']]);



    const [keyword, setKeyword] = useState('');
    const [product, setProduct] = useState([]);

    const shop = useSelector(item => item.shop)

    useEffect(() => {
        setProduct(shop)
    }, [shop])


    const filteredProducts = !keyword ? product : product.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));


    return (
        <div>
            <div className='wrapper-div'>
                <header className='mt-5'>
                    <nav className={`nav ${openSearch ? 'openSearch' : ''} ${openNav ? 'openNav' : ''}`}>
                        <i className="uil uil-bars navOpenBtn" onClick={toggleNav} style={{ background: 'none' }}></i>
                        <Link to="/" className="nav-logo">
                            <img src="../src/assets/img/pngwing.png" alt="" />
                        </Link>
                        <ul className="nav-links">
                            <i className="uil uil-times navCloseBtn" onClick={() => setOpenNav(false)} style={{ background: 'none' }}></i>
                            <li onClick={() => setOpenNav(false)}><NavLink to="/">Home</NavLink></li>
                            <li onClick={() => setOpenNav(false)}><NavLink to="/shop/c">Shop</NavLink></li>
                        </ul>

                        <div className='d-flex align-items-center' style={{ background: 'none', gap: '10px' }}>
                            <i style={{ background: 'none' }} className={`uil ${openSearch ? 'uil-times' : 'uil-search'} search-icon`} onClick={toggleSearch}></i>
                            <div className='user-components'>
                                <ul className='user-elements-list'>
                                    <li className='list-group-item '>
                                        {cookies['cookie-user'] ?
                                            <div className="user-dropdown" ref={el => dropdownRefs.current[0] = el}>
                                                <button
                                                    className="user-dropdown-btn" onClick={() => toggleDropdown(0)}>
                                                    <img className='user-image' src={filterUsersInformation.image}
                                                        alt="" style={{ width: '40px', objectFit: 'cover', border: 'none', background: 'none' }} />
                                                    <span style={{ background: 'none' }}><MdOutlineKeyboardArrowDown style={{ background: 'none' }} /></span>
                                                </button>
                                                <div className={`user-dropdown-content ${openDropdownIndex === 0 ? 'open' : ''}`}>
                                                    <ul className='account-buttons'>
                                                        <li className='list-group-item wishlist  mb-2'>
                                                            <Link to='/wishlist' className='wishlist-button' style={{ textDecoration: 'none', color: 'white' }}>
                                                                <CiHeart className='me-4' style={{ background: 'none', fontSize: '25px' }} />
                                                                <span style={{ background: 'none' }}>Wishlist</span>
                                                            </Link>
                                                            <span className='wishlist-counter'>{wishlist}</span>
                                                        </li>

                                                        <li className='list-group-item add-to-card mb-2'>
                                                            <Link to='/basket' className='add-to-card-button' style={{ textDecoration: 'none', color: 'white' }}>
                                                                <PiShoppingCartThin className='me-4' style={{ background: 'none', fontSize: '25px' }} />
                                                                <span style={{ background: 'none' }}>Basket</span>
                                                            </Link>
                                                            <span className='add-to-card-counter'>{basketNavbarQuantity}</span>
                                                        </li>
                                                        <li className='list-group-item mb-2'>
                                                            <NavLink to={`/auth/account/${cookies['cookie-user']}`} className='account-button' onClick={() => { setOpenDropdownIndex(null); }}>
                                                                <CiUser className='me-4' style={{ background: 'none', fontSize: '25px' }} />
                                                                Account
                                                            </NavLink>
                                                        </li>
                                                        <li className='list-group-item mb-2'>
                                                            <button onClick={() => { setOpenDropdownIndex(null); removeCookie('cookie-user'); window.location.assign('/') }}>
                                                                <CiLogout className='me-4' style={{ background: 'none', fontSize: '25px' }} />
                                                                Log out
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            <Link to='/auth/login' style={{ background: 'none' }}><LiaUserSolid style={{ background: 'none', fontSize: '25px' }} /></Link>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="search-box" style={{ background: 'none' }}>
                            <i className="uil uil-search search-icon" style={{ background: 'none' }}></i>
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />

                            <div className='modal-div mt-3'>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((item, index) => (
                                        <Link
                                            key={item.id}
                                            onClick={() => setOpenSearch(false)}
                                            to={`/shop/${slugify(item.title)}`}
                                            className='d-flex align-items-center justify-content-between mb-2'
                                            style={{ '--clr': 'red', border: '1px solid #69747e', borderRadius: '12px', padding: '8px' }}
                                        >
                                            <div key={item.id} className='search-products'>
                                                <img src={item.image} alt="" />
                                                <div>
                                                    <h6 className='title'>{item.title}</h6>
                                                    <h6 className='price'>$ {item.price}</h6>
                                                </div>
                                            </div>

                                            <div className='angels-icon'>
                                                <i class="fa-solid fa-angles-right"></i>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className='text-center' style={{ color: 'white' }}>No results found</div>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    );
};

export default Navbar;