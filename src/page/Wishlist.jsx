import React, { useState, useEffect } from 'react';
import { GoBookmark } from 'react-icons/go';
import supabase from '../tools/config/connect';
import { useCookies } from 'react-cookie';
import WishlistSingleCard from '../components/WishlistComponents/WishlistSingleCard';

const Wishlist = () => {
    const [cookies] = useCookies(['cookie-user']);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlistData = async () => {
            const { data, error } = await supabase.from('Wishlist').select();

            if (error) {
                console.log('Error fetching wishlist data:', error);
            } else {
                setWishlist(data);
            }
        };

        fetchWishlistData();
    }, []);

    const filterWishlistUserToken = wishlist.find(item => item.wishlist_user_token === cookies['cookie-user']);

    // ===================================DeleteAllItem==================================================
    const deleteAllItem = async () => {
        const { data, error } = await supabase.from('Wishlist')
            .delete()
            .eq('wishlist_user_token', cookies['cookie-user']);

        if (error) {
            console.log('Error deleting items:', error);
        } else {
            fetchWishlistData();
        }
    };

    return (
        <div className='wishlist-components mt-4'>  
            <div className='wishlist-container'>
                <div className='wishlist-header mb-4'>
                    <div><i class="fa-solid fa-bookmark"></i></div>

                    <div className='right-items'>
                        <button onClick={deleteAllItem} className='wishliat-clear-button'>Clear Wishlist</button>
                    </div>
                </div>
                <div className='row'>
                    {filterWishlistUserToken === undefined ? <h3 className='text-center'>Not Found Product</h3> :
                        (filterWishlistUserToken.wishlist_products.map((item, index) => (
                            <div className=' col-12 col-sm-12 col-md-6 mb-5'>
                                <WishlistSingleCard key={index} alldata={item} index={index} />
                            </div>
                        )))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
