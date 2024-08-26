import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../tools/config/connect'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import BasketSingleCard from './BasketComponents/BasketSingleCard'

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-user', 'admin-token']);

  useEffect(() => {
    const getBasketInformation = async () => {
      const { data, error } = await supabase.from('Basket').select();
      if (error) {
        console.log(error);
      } else {
        setBasket(data);
      }
    }

    getBasketInformation();
  }, [])

  const findUser = basket.find(item => item.basket_user_token === cookies['cookie-user']);

  const [totalPrice, setTotalPrice] = useState(0);

  const sumQuantities = (products) => {
    return products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    if (findUser) {
      const calculatedTotal = sumQuantities(findUser.products);
      setTotalPrice(calculatedTotal);
    }
  }, [findUser]);

  
  // ===================================DeleteAllItem==================================================
  const deleteAllItem = async () => {
    const { data, error } = await supabase.from('Basket')
      .delete()
      .eq('basket_user_token', cookies['cookie-user'])
  }

  return (
    <div className='basket-components mt-5'>
      <div className='container'>
        <div className='basket-header mb-4'>
          <div className='total-price'>Total Price: ${(totalPrice).toFixed(2)}</div>
 
          <div className='right-items'>
            <Link to=''>Complete Order</Link>
            <button className='basket-clear-button' onClick={() => { deleteAllItem(); window.location.reload() }}>Clear Basket</button>
          </div>
        </div>
        <div className='row'>
          {findUser === undefined ? <h3 className='text-center'>Not Found Product</h3> :
            (findUser.products.map((item, index) => (
              <BasketSingleCard key={index} alldata={item} index={index} />
            )))
          }
        </div>
      </div>
    </div>
  )
}

export default Basket