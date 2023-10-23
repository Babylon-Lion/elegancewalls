import { atom } from 'jotai';

export const isCartOpenAtom = atom(false);
export const wishlistAtom = atom(JSON.parse(localStorage.getItem('wishlist') || '[]'));
