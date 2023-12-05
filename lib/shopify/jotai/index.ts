import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Product } from '../types';
export const isCartOpenAtom = atom(false);

export const wishlistAtom = atomWithStorage<Product[]>('wishlist', []);
