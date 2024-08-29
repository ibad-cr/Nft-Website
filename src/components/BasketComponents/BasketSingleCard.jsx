import React, { useEffect, useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import supabase from '../../tools/config/connect';
import { useCookies } from 'react-cookie';

const BasketSingleCard = ({ alldata, index }) => {
    const [cookies] = useCookies(['cookie-user']);
    const [basketData, setBasketData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(alldata.price);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('Basket').select();
            if (error) {
                console.log(error);
            } else {
                const newData = data.find(item => item.basket_user_token === cookies['cookie-user']);
                if (newData) {
                    setBasketData(newData);
                    const product = newData.products.find(p => p.id === alldata.id);
                    if (product) {
                        setQuantity(product.quantity);
                        setTotalPrice(product.quantity * alldata.price);
                    }
                }
            }
        };

        fetchData();
    }, [cookies['cookie-user'], alldata.id]);

    // ===================================Update Basket==================================================
    const updateBasket = async (newQuantity) => {
        const updatedProducts = basketData.products.map(product =>
            product.id === alldata.id ?
                { ...product, quantity: newQuantity, price: alldata.price } : product
        );

        const { error } = await supabase.from('Basket')
            .update({ products: updatedProducts })
            .eq('basket_user_token', cookies['cookie-user']);

        if (error) {
            console.log(error);
        } else {
            setBasketData({ ...basketData, products: updatedProducts });
        }
    };

    // ===================================Increment==================================================
    const increment = async () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setTotalPrice(newQuantity * alldata.price);
        await updateBasket(newQuantity);
    };

    // ===================================Decrement==================================================
    const decrement = async () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setTotalPrice(newQuantity * alldata.price);
            await updateBasket(newQuantity);
        }
    };

    // ===================================DeleteItem==================================================
    const deleteItem = async () => {
        const updatedProducts = basketData.products.filter(product => product.id !== alldata.id);

        const { error } = await supabase.from('Basket')
            .update({ products: updatedProducts })
            .eq('basket_user_token', cookies['cookie-user']);

        if (!error) {
            setBasketData(prevData => ({
                ...prevData,
                products: updatedProducts
            }));
        } else {
            console.log(error);
        }
    };

    return (
        <div className='basket-single-card mb-3'>
            <div className="card mt-2">
                <div className='product-count'>{index + 1}</div>
                <div className="card-body">
                    <div className='products-information'>
                        <div className='left-side'>
                            <div className='product-name'>
                                <h5 className='text-center'>{alldata.title}</h5>
                            </div>
                            <div className='product-text mt-3'>
                                <h6 className='text-center'>{alldata.information}</h6>
                            </div>
                            <div className='counter-section'>
                                <ul className='my-3'>
                                    <div className='counter-text'>Counter: </div>
                                    <li className='list-group-item'><button onClick={decrement}>-</button></li>
                                    <li className='list-group-item'><span className='quantity'>{quantity}</span></li>
                                    <li className='list-group-item'><button onClick={increment}>+</button></li>
                                </ul>
                                <div className='d-flex justify-content-between align-items-center' style={{ borderTop: '2px solid white' }}>
                                    <div className='single-delete-button' onClick={() => { deleteItem(); window.location.reload() }}><CiTrash /></div>
                                    <div className='product-price'>Price: ${(totalPrice).toFixed(2)}</div>
                                </div>
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
    );
}

export default BasketSingleCard;
