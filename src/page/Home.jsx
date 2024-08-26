import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ShopSingleCard from '../components/ShopComponents/ShopSingleCard';
import { Link } from 'react-router-dom';
import HomeSwiperJs from '../components/HomeComponents/HomeSwiperJs';


const Home = () => {

    const shop = useSelector(state => state.shop);

    const [shopItems, setShopItems] = useState([])

    useEffect(() => {
        setShopItems(shop)
    }, [shop])


    return (
        <div>
            <main>
                <div className="home-wrapper">
                    <div className="home-container">
                        <div className='home-elements mt-4 mb-5'>
                            <div className='opening-part mt-4 mb-4'>
                                <div className="right-side">
                                    <div className="nft-image">
                                        <div className='gradient-purple'></div>
                                        <div className='gradient-white'></div>
                                        <img className='image' src="../src/assets/img/samurai.png" alt="NFT Art" />
                                    </div>
                                </div>

                                <div className='left-side'>
                                    <p className='nft-information-text'>
                                        NFTs are notable for their uniqueness and indivisibility.
                                        Each NFT has distinct attributes that differentiate it from others,
                                        making them non-fungible. This uniqueness makes NFTs particularly appealing
                                        for collecting and trading. When someone purchases an NFT, they acquire ownership of a
                                        unique digital item. While copies can be made and shared, the blockchain verifies ownership
                                        and maintains a record of the item’s authenticity and ownership history.
                                    </p>
                                </div>
                            </div>

                            <div  className='cards-section'>
                            <h3 className='text-center my-3'>Recommed products</h3>
                                <HomeSwiperJs/>
                                <div className='d-flex justify-content-center my-4'>
                                        <Link to='/shop' className='animated-button'>
                                            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                                ></path>
                                            </svg>
                                            <span class="text">More Nft</span>
                                            <span class="circle"></span>
                                            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                                ></path>
                                            </svg>
                                        </Link>
                                    </div>
                            </div>
                            {/* <div className='cards-section'>
                                < div className='mt-2' style={{ padding: '20px' }}>
                                    <div className='row row-cols-1 row-cols-md-4 g-4'>
                                        {shopItems.slice(0, 8).map((item, index) => (
                                            <div key={index}>
                                                <ShopSingleCard
                                                    image={item.image}
                                                    title={item.title}
                                                    information={item.information}
                                                    category={item.category}
                                                    price={item.price}
                                                    quantity={item.quantity}
                                                    alldata={item} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='d-flex justify-content-center my-4'>
                                        <Link to='/shop' className='animated-button'>
                                            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                                ></path>
                                            </svg>
                                            <span class="text">More Nft</span>
                                            <span class="circle"></span>
                                            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                                ></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                                <div className='decoration'>
                                    <div className='decoration-div'></div>
                                    <div className='decoration-circle-div'></div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div >
            </main >
        </div >
    )
}

export default Home;