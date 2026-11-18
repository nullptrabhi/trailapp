import type { ImageSourcePropType } from 'react-native';

export const cities = ['Pune', 'Mumbai', 'Bengaluru'] as const;
export type City = (typeof cities)[number];

export const placeCategories = [
  'Food & drink',
  'Outdoors',
  'Culture',
  'Wellness',
  'Shopping',
] as const;
export type PlaceCategory = (typeof placeCategories)[number];
export type CategoryFilter = 'All' | PlaceCategory;

export interface PlaceNote {
  author: string;
  note: string;
  occasion: string;
}

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  city: City;
  area: string;
  address: string;
  description: string;
  image: ImageSourcePropType;
  goodFor: string;
  bestTime: string;
  notes: PlaceNote[];
}
