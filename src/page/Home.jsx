import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeSwiperJs from '../components/HomeComponents/HomeSwiperJs';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

const Home = () => {
    const [cookies, setCookie] = useCookies(['cookie-user', 'admin-token']);

    const shop = useSelector(state => state.shop);

    const [shopItems, setShopItems] = useState([])

    useEffect(() => {
        setShopItems(shop)
    }, [shop])


    const showToastMessage = () => {
        toast.success("Welcome 😀.Please register and enjoy all the features 👋", {
            position: 'top-right',
            className: 'toastify-message'
        });
    }

    useEffect(() => {
        if (!cookies['cookie-user']) {
            showToastMessage();
        } else {
            ''
        }
    }, []);

    return (
        <div>
            <main>
                <ToastContainer />
                <div className="home-wrapper">
                    <div className="home-container">
                        <div className='home-elements mt-4 mb-5'>

                            <div className='heroes mb-4'>
                                <div className="text-section">
                                    <h4 className='text-center mb-3'>What is an NFT?</h4>
                                    <p>
                                        <strong> Unique and Verified:</strong> NFTs are unique and recorded on the blockchain, which makes
                                        it difficult for them to be counterfeit or duplicated. Each NFT has its own unique
                                        identifier and metadata.
                                    </p>
                                    <p>
                                        <strong>Non-Fungible:</strong> NFTs are non-fungible, meaning each NFT is distinct and not
                                        interchangeable with any other NFT. For example, an NFT could represent a digital
                                        artwork, and it has specific attributes that make it different from other NFTs.
                                    </p>
                                </div>
                                <div className="horizontal-carousel">
                                    <div className="images">
                                        <div className="image-slide">
                                            {shopItems.slice(0, 8).map((item, index) => (
                                                <img key={index} src={item.image} alt={item.text} />
                                            ))}
                                        </div>
                                        <div className="image-slide">
                                            {shopItems.slice(0, 8).map((item, index) => (
                                                <img key={index} src={item.image} alt={item.text} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="images-two">
                                        <div className="image-slide-two">
                                            {shopItems.slice(9, 17).map((item, index) => (
                                                <img key={index} src={item.image} alt={item.text} />
                                            ))}
                                        </div>
                                        <div className="image-slide-two">
                                            {shopItems.slice(9, 17).map((item, index) => (
                                                <img key={index} src={item.image} alt={item.text} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="images">
                                        <div className="image-slide">
                                            {shopItems.slice(17, 25).map((item, index) => (
                                                <img key={index} src={item.image} alt={item.text} />
                                            ))}
                                        </div>
                                        <div className="image-slide">
                                            {shopItems.slice(17, 25).map((item, index) => (
                                                <img key={index} src={item.image} alt={item.text} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='home-cards-section'>
                                <h3 className='text-center mt-3'>Recommed products</h3>
                                <HomeSwiperJs />
                                <div className='d-flex justify-content-center my-4'>
                                    <Link to='/shop/c' className='animated-button'>
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