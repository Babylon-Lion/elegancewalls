import { atom } from 'jotai';

export const isCartOpenAtom = atom(false);
//@ts-ignore
export const wishlistAtom = atom(
  typeof window != undefined ? JSON.parse(localStorage.getItem('wishlist') || '[]') : []
);
