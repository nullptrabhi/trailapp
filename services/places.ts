import { mockPlaces } from '@/features/places/data/mockPlaces';
import type { CategoryFilter, City, Place } from '@/types/place';

export interface SearchPlacesOptions {
  city: City;
  query: string;
  category: CategoryFilter;
}

export function getPlacesForCity(city: City): Place[] {
  return mockPlaces.filter((place) => place.city === city);
}

export function getPlaceById(id: string): Place | undefined {
  return mockPlaces.find((place) => place.id === id);
}

export function getPlacesByIds(ids: string[]): Place[] {
  return ids
    .map((id) => getPlaceById(id))
    .filter((place): place is Place => place !== undefined);
}

export function searchPlaces({ city, query, category }: SearchPlacesOptions): Place[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return getPlacesForCity(city).filter((place) => {
    const matchesCategory = category === 'All' || place.category === category;
    const searchableText = [
      place.name,
      place.category,
      place.area,
      place.address,
      place.description,
      place.goodFor,
    ]
      .join(' ')
      .toLocaleLowerCase();
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}
