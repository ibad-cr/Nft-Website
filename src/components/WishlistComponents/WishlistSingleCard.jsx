import React, { useEffect, useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import supabase from '../../tools/config/connect';
import { useCookies } from 'react-cookie';

const WishlistSingleCard = ({ alldata, index }) => {
    const [wishlistData, setWishlistData] = useState([]);
    const [cookies] = useCookies(['cookie-user']);

    useEffect(() => {
        const fetchWishlistData = async () => {
            const { data, error } = await supabase.from('Wishlist').select();

            if (error) {
                console.log('Error fetching wishlist data:', error);
            } else {
                const filteredData = data.find(item => item.wishlist_user_token === cookies['cookie-user']);
                setWishlistData(filteredData ? filteredData.wishlist_products : []);
            }
        };

        fetchWishlistData();
    }, [cookies]);

    // ===================================DeleteItem==================================================
    const deleteItem = async () => {
        const updatedProducts = wishlistData.filter(product => product.id !== alldata.id);

        const { error } = await supabase.from('Wishlist')
            .update({ wishlist_products: updatedProducts })
            .eq('wishlist_user_token', cookies['cookie-user']);

        if (!error) {
            setWishlistData(updatedProducts);
        } else {
            console.log(error);
        }
    };

    return (
        <div>
            <div className='wishlist-single-card mb-3'>
                <div className="card mt-2">
                    <div className='product-count'>{index + 1}</div>
                    <div className='deleteButton'>
                        <button onClick={() => { deleteItem(); window.location.reload() }}><CiTrash style={{ fontSize: '20px' }} /></button>
                    </div>
                    <div className="card-body">
                        <div className='products-information'>
                            <div className='left-side'>
                                <div className='product-name'>
                                    <h5 className='text-center'>{alldata.title}</h5>
                                </div>
                                <div className='product-text mt-3'>
                                    <h6 className='text-center'>{alldata.information}</h6>
                                </div>
                            </div>
                            <div className='right-side'>
                                <div className='product-image'>
                                    <img className='img' src={alldata.image} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default WishlistSingleCard;
