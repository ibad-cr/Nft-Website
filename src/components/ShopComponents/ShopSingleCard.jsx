import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';
import supabase from '../../tools/config/connect';
import Aos from 'aos';
import Swal from 'sweetalert2';

const ShopSingleCard = ({ id, image, title, information, color, price, quantity, quality, alldata }) => {
    const location = useLocation();

    const [isInWishlist, setIsInWishlist] = useState(false);

    // =================================Add Basket Product========================================
    const [cookies] = useCookies(['cookie-user', 'admin-token']);

    const dataSendToBasket = async () => {
        try {
            const { data, error } = await supabase
                .from('Basket')
                .select()
                .eq('basket_user_token', cookies['cookie-user']);

            if (error) {
                console.log(error);
                Swal.fire('Error', 'Error adding to basket.', 'error');
            } else {
                if (data.length === 0) {
                    const { error } = await supabase.from('Basket').insert({
                        basket_user_token: cookies['cookie-user'], products: [{ ...alldata, quantity: 1 }]
                    });
                    if (error) {
                        console.log('Error inserting product:', error);
                        Swal.fire('Error', 'Error adding to basket.', 'error');
                    } else {
                        Swal.fire('Success', 'Product added to basket!', 'success');
                    }
                } else {
                    const basket = data[0];
                    const productIndex = basket.products.findIndex(product => product.id === alldata.id);

                    if (productIndex !== -1) {
                        basket.products[productIndex].quantity += 1;
                    } else {
                        basket.products.push({ ...alldata, quantity: 1 });
                    }

                    const { error } = await supabase
                        .from('Basket')
                        .update({ products: basket.products })
                        .eq('basket_user_token', cookies['cookie-user']);

                    if (error) {
                        console.log('Error updating basket:', error);
                        Swal.fire('Error', 'Error updating basket.', 'error');
                    } else {
                        Swal.fire('Success', 'Basket updated!', 'success');
                    }
                }
            }
        } catch (error) {
            console.log('Error adding to basket:', error);
            Swal.fire('Error', 'Error adding to basket.', 'error');
        }
    };

    useEffect(() => {
        const checkWishlist = async () => {
            if (!cookies['cookie-user']) return;

            try {
                const { data, error } = await supabase
                    .from('Wishlist')
                    .select()
                    .eq('wishlist_user_token', cookies['cookie-user']);

                if (error) {
                    console.log(error);
                    return;
                }

                if (data.length > 0) {
                    const isProductInWishlist = data.some(item =>
                        item.wishlist_products.some(product => product.id === alldata.id)
                    );
                    setIsInWishlist(isProductInWishlist);
                } else {
                    setIsInWishlist(false);
                }
            } catch (error) {
                console.log('Error checking wishlist:', error);
            }
        };

        checkWishlist();
    }, [cookies['cookie-user'], alldata]);

    const dataSendToWishlist = async () => {
        try {
            const { data: wishlistData, error: wishlistError } = await supabase
                .from('Wishlist')
                .select()
                .eq('wishlist_user_token', cookies['cookie-user']);

            if (wishlistError) {
                console.error('Wishlist fetch error:', wishlistError);
                Swal.fire('Error', 'Error managing wishlist.', 'error');
                return;
            }

            if (wishlistData.length === 0) {
                const { error: insertError } = await supabase.from('Wishlist').insert({
                    wishlist_user_token: cookies['cookie-user'],
                    wishlist_products: [alldata]
                });

                if (insertError) {
                    console.error('Error inserting product:', insertError);
                    Swal.fire('Error', 'Error adding to wishlist.', 'error');
                } else {
                    setIsInWishlist(true);
                    Swal.fire('Success', 'Product added to wishlist!', 'success');
                }
            } else {
                const userWishlist = wishlistData[0];
                const isProductAlreadyInWishlist = userWishlist.wishlist_products.some(
                    product => product.id === alldata.id
                );

                if (isProductAlreadyInWishlist) {
                    const updatedWishlistProducts = userWishlist.wishlist_products.filter(
                        product => product.id !== alldata.id
                    );

                    const { error: updateError } = await supabase
                        .from('Wishlist')
                        .update({ wishlist_products: updatedWishlistProducts })
                        .eq('wishlist_user_token', cookies['cookie-user']);

                    if (updateError) {
                        console.error('Error removing product:', updateError);
                        Swal.fire('Error', 'Error removing from wishlist.', 'error');
                    } else {
                        setIsInWishlist(false);
                        Swal.fire('Success', 'Product removed from wishlist!', 'success');
                    }
                } else {
                    const updatedWishlistProducts = [...userWishlist.wishlist_products, alldata];

                    const { error: updateError } = await supabase
                        .from('Wishlist')
                        .update({ wishlist_products: updatedWishlistProducts })
                        .eq('wishlist_user_token', cookies['cookie-user']);

                    if (updateError) {
                        console.error('Error adding product:', updateError);
                        Swal.fire('Error', 'Error adding to wishlist.', 'error');
                    } else {
                        setIsInWishlist(true);
                        Swal.fire('Success', 'Product added to wishlist!', 'success');
                    }
                }
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
            Swal.fire('Error', 'Error managing wishlist.', 'error');
        }
    };

    // ======================AOS======================================================================
    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div className='shop-single-card'>
            <div className="col">
                <div className="card">
                    <div className='image-div'>
                        <img src={image} className="card-img-top" alt="..." />
                        <div className='ooo'></div>
                        <div className='card-information-div'>
                            <h5 className="card-title">{title}</h5>
                            <h5 className="card-text mt-2">{information}</h5>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className='price-and-shopping-buttons'>
                            <div className="product-price">$ {price}</div>
                            <div className='market-buttons'>
                                {!cookies['cookie-user'] ?
                                    <Link to='/auth/login' className='add-to-card-button me-2'>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </Link>
                                    :
                                    <button className='add-to-card-button' onClick={dataSendToBasket}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>}

                                {!cookies['cookie-user'] ?
                                    <Link to='/auth/login' className='wishlist-button'>
                                        {isInWishlist ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
                                    </Link>
                                    :
                                    <button className='wishlist-button' onClick={() => { dataSendToWishlist() }}>
                                        {isInWishlist ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
                                    </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopSingleCard;
