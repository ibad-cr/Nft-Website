import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ShopSingleCard from '../components/ShopComponents/ShopSingleCard';
import Aos from 'aos';

const Shop = () => {
    const shop = useSelector(state => state.shop);

    const [filterShop, setFilterShop] = useState([]);

    useEffect(() => {
        setFilterShop(shop);
    }, [shop]);


    // ===========================Drop-Down-Menu=========================================

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

    // ==========================Filter-Price-Buttons============================================
    const filterPriceData = (cat) => {
        if (cat === 'All') {
            setFilterShop(shop);
        } else if (cat === 'Free') {
            const result = shop.filter(item => item.price === 0);
            setFilterShop(result);
        } else if (cat === 'Paid') {
            const result = shop.filter(item => item.price > 0);
            setFilterShop(result);
        }
    };

    // ==========================Filter-Color-Buttons============================================
    const filterColorData = (cat) => {
        if (cat === 'All') {
            setFilterShop(shop);
        } else {
            const result = shop.filter(item => item.color === cat);
            setFilterShop(result);
        }
    };

    // ==========================Filter-Quality-Buttons============================================

    const filterQualityData = (cat) => {
        const result = shop.filter(item => item.quality === cat);
        setFilterShop(result);
    };
    // =============================Sort-Low-High-Button=========================================
    const lowSort = () => {
        const lowPrice = [...filterShop].sort((a, b) => a.price - b.price)
        setFilterShop(lowPrice);
    }

    const highSort = () => {
        const highPrice = [...filterShop].sort((a, b) => b.price - a.price)
        setFilterShop(highPrice);
    }

    const [keyword, setKeyword] = useState('');
    const [product, setProduct] = useState([]);

    useEffect(() => {
        setProduct(shop)
    }, [shop])


    const filteredProducts = !keyword ? product : product.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));

    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div className='shop-wrapper'>
            <div className="shop-container">
                <div className='shop-opening-part mb-4'>
                    <h1 className='text-center' style={{ margin: '0', padding: '0' }}>Shop</h1>
                    <div className='text-and-shop mt-3'>
                        <h6>NFTs are unique and indivisible digital assets, much like a samurai’s treasured blade.
                            Each NFT has distinct features that make it non-fungible, adding to its allure for collectors.
                            Owning an NFT means possessing a one-of-a-kind digital item. While copies can be made,
                            the blockchain verifies and records its authenticity and ownership, ensuring each
                            NFT carries a unique digital legacy.
                        </h6>
                        <div className='image-animation-border'>
                            <div className='border-and-circle'>
                                <div className='animation-border'></div>
                                <div className='animation-circle-one'></div>
                                <div className='animation-circle-two'></div>
                            </div>
                            <img src="../src/assets/gif/gori-samurai-nft_e0wYcoPdeLhBKun8.webp" alt="Samurai NFT" />
                        </div>

                    </div>
                </div>
                <div className='border-div'>
                    <div className='d-flex align-items-center justify-content-center' style={{ gap: '30px' }}>
                        <div className='dropdown-button-list'>
                            <ul className='all-button-list'>
                                <li className='list-group-item'>
                                    <div className="dropdown" ref={el => dropdownRefs.current[0] = el}>
                                        <button className="dropdown-btn" onClick={() => toggleDropdown(0)}>
                                            Price
                                        </button>
                                        <div className={`dropdown-content ${openDropdownIndex === 0 ? 'open' : ''}`}>
                                            <ul className='price-list mt-3'>
                                                <li className='list-group-item'>
                                                    <button onClick={() => { setOpenDropdownIndex(null); filterPriceData('All') }}>All</button>
                                                </li>
                                                <li className='list-group-item'>
                                                    <button onClick={() => { setOpenDropdownIndex(null); filterPriceData('Free') }}>Free</button>
                                                </li>
                                                <li className='list-group-item'>
                                                    <button onClick={() => { setOpenDropdownIndex(null); filterPriceData('Paid') }}>Paid</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className="dropdown" ref={el => dropdownRefs.current[1] = el}>
                                        <button className="dropdown-btn" onClick={() => toggleDropdown(1)}>
                                            Color
                                        </button>
                                        <div className={`dropdown-content ${openDropdownIndex === 1 ? 'open' : ''}`}>
                                            <ul className='color-list mt-3'>
                                                <div className='first-part'>
                                                    <li className='list-group-item'>
                                                        <button className='red' onClick={() => { setOpenDropdownIndex(null); filterColorData('red') }}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='green' onClick={() => { setOpenDropdownIndex(null); filterColorData('green') }}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='yellow' onClick={() => { setOpenDropdownIndex(null); filterColorData('yellow') }}></button>
                                                    </li>
                                                </div>
                                                <div className='secont-part'>
                                                    <li className='list-group-item'>
                                                        <button className='blue' onClick={() => { setOpenDropdownIndex(null); filterColorData('blue') }}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='purple' onClick={() => { setOpenDropdownIndex(null); filterColorData('purple') }}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='mix-color' onClick={() => { setOpenDropdownIndex(null); filterColorData('mix') }}></button>
                                                    </li>
                                                </div>
                                                <div className='thirdly-part'>
                                                    <li className='list-group-item'>
                                                        <button className='brown' onClick={() => { setOpenDropdownIndex(null); filterColorData('brown') }}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='orange' onClick={() => { setOpenDropdownIndex(null); filterColorData('orange') }}></button>
                                                    </li>
                                                    <li className='list-group-item'>
                                                        <button className='' onClick={() => { setOpenDropdownIndex(null); filterColorData('All') }}>All</button>
                                                    </li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className="dropdown" ref={el => dropdownRefs.current[2] = el}>
                                        <button className="dropdown-btn" onClick={() => toggleDropdown(2)}>
                                            Quality
                                        </button>
                                        <div className={`dropdown-content ${openDropdownIndex === 2 ? 'open' : ''}`}>
                                            <ul className='quality-list mt-3'>
                                                <li className='list-group-item'>
                                                    <button onClick={() => { setOpenDropdownIndex(null); filterQualityData('premium') }}>Premium</button>
                                                </li>
                                                <li className='list-group-item'>
                                                    <button onClick={() => { setOpenDropdownIndex(null); filterQualityData('modern') }}>Modern</button>
                                                </li>
                                                <li className='list-group-item'>
                                                    <button onClick={() => { setOpenDropdownIndex(null); filterQualityData('classic') }}>Classic</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className='sort-method' ref={el => dropdownRefs.current[3] = el}>
                            <button className="sort-dropdown-btn" style={{ background: 'none' }} onClick={() => toggleDropdown(3)}>
                                <i class="fa-solid fa-sort"></i>
                            </button>
                            <div className={`sort-dropdown-content ${openDropdownIndex === 3 ? 'open' : ''}`}>
                                <ul className='sort-list mt-3'>
                                    <li className='list-group-item' style={{ border: '1px solid orange' }}>
                                        <button onClick={() => { lowSort(); setOpenDropdownIndex(null); }}>Price: low to high</button>
                                        <button onClick={() => { highSort(); setOpenDropdownIndex(null); }}>Price: high to low </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='shop-cards-section mt-4'>
                    <div className='shop-search-box'>
                        <div className='search-icon-div'>
                            <i className="uil uil-search search-icon" style={{ background: 'none' }}></i>
                        </div>

                        <input
                            type="text"
                            className='mb-4 mt-3'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder='Search product...' />
                    </div>

                    <div className='cards-gradient'></div>
                    <div className='row row-cols-2 row-cols-xl-4 row-cols-lg-3 g-4' style={{ background: 'none' }}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item, index) => (
                                <div className='' key={index} style={{ background: 'none' }}>
                                    <ShopSingleCard
                                        image={item.image}
                                        title={item.title}
                                        information={item.information}
                                        category={item.category}
                                        price={item.price}
                                        quantity={item.quantity}
                                        alldata={item}
                                    />
                                </div>
                            ))
                        ) : (
                            <h3 className='text-center' style={{ color: 'white', width: '100%' }}>No products found</h3>
                        )}
                    </div>

                </div>
            </div >
        </div>
    );
};

export default Shop;
