import supabase from "../config/connect";
import { shopList } from '../slice/shopSlice.js'
import store from '../../../src/tools/store/shopStore.js'
import { userList } from "../slice/userSlice.js";

export const shopData = async () => {
    const { data, error } = await supabase.from('NftProducts').select();
    if (error) {
        console.log('Supabase error:', error)
    } else {
        store.dispatch(shopList(data));
    }
}

export const userData = async () => {
    const { data, error } = await supabase.from('Users').select();
    if (error) {
        console.log('Supabase error:', error)
    } else {
        store.dispatch(userList(data));
    }
}