import React from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './page/Home'
import Shop from './page/Shop'
import ShopSingleCard from './components/ShopComponents/ShopSingleCard'
import Login from './page/auth/Login'
import Register from './page/auth/Register'
import Account from './page/auth/Account'
import { useContext } from 'react'
import { FontsContext } from './context/Fonts'
import { ModeContext } from './context/Mode'
import Basket from './components/Basket'
import Wishlist from './page/Wishlist'
import WishlistSingleCard from './components/WishlistComponents/WishlistSingleCard'
import HomeSwiperJs from './components/HomeComponents/HomeSwiperJs'

const App = () => {

  const [mode, setMode] = useContext(ModeContext);

  const getClassName = () => {
    switch (mode) {
      case 'changeBgColorRed':
        return 'changeBgColorRed';
      case 'changeBgColorBlue':
        return 'changeBgColorBlue';
      case 'changeBgColorOrange':
        return 'changeBgColorOrange';
      case 'changeBgColorWhite':
        return 'changeBgColorWhite';
      case 'changeBgColorPurple':
        return 'changeBgColorPurple';
      case 'changeBgColorBrown':
        return 'changeBgColorBrown';
      case 'changeBgColorYellow':
        return 'changeBgColorYellow';
      default:
        return 'bodyBgColor';
    }
  };

  const [fonts, setFonts] = useContext(FontsContext);

  const getClassNameFonts = () => {
    switch (fonts) {
      case 'zen-dots':
        return 'zen-dots';
      case 'koulen-font':
        return 'koulen-font';
      case 'bungee-font':
        return 'bungee-font';
      case 'foldit-font':
        return 'foldit-font';
      case 'chakra-font':
        return 'chakra-font';
      case 'orbitron-font':
        return 'orbitron-font';
      case 'press-start-font':
        return 'press-start-font';
      case 'monoton-font':
        return 'monoton-font';
      case 'vt-font':
        return 'vt-font';
      case 'righteous-font':
        return 'righteous-font';
      case 'audiowide-font':
        return 'audiowide-font';
      case 'slackey-font':
        return 'slackey-font';
      case 'black-ops-one-font':
        return 'black-ops-one-font';
      case 'special-elite-font':
        return 'special-elite-font';
      case 'sankofaDisplay-font':
        return 'sankofaDisplay-font';
      case 'gruppo-font':
        return 'gruppo-font';
      case 'novaRound-font':
        return 'novaRound-font';
      case 'rubikWet-font':
        return 'rubikWet-font';
      case 'akaya-font':
        return 'akaya-font';
      case 'saira-stencil-font':
        return 'saira-stencil-font';
      default:
        return 'bodyMainFonts';
    }
  };


  return (
    <div className={`${getClassName()} ${getClassNameFonts()}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home/homeSwiperJs' element={<HomeSwiperJs />}></Route>
          <Route path='/shop/:slug' element={<Shop />}></Route>
          <Route path='/shop/shopSingleCard' element={<ShopSingleCard />}></Route>
          <Route path='/auth/login' element={<Login />}></Route>
          <Route path='/auth/register' element={<Register />}></Route>
          <Route path='/auth/account/:token' element={<Account />}></Route>
          <Route path='/basket' element={<Basket />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
          <Route path='/wishlist/wishlistSingleCard' element={<WishlistSingleCard />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App