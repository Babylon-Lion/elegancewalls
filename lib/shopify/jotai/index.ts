import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
export const isCartOpenAtom = atom(false);

export const wishlistAtom = atomWithStorage('wishlist', []);
