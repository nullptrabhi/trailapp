import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { City } from '@/types/place';

interface TrailState {
  city: City;
  savedPlaceIds: string[];
  recentPlaceIds: string[];
  setCity: (city: City) => void;
  toggleSavedPlace: (placeId: string) => void;
  recordRecentPlace: (placeId: string) => void;
  clearRecentPlaces: () => void;
}

export const useTrailStore = create<TrailState>()(
  persist(
    (set) => ({
      city: 'Pune',
      savedPlaceIds: [],
      recentPlaceIds: [],
      setCity: (city) => set({ city }),
      toggleSavedPlace: (placeId) =>
        set((state) => ({
          savedPlaceIds: state.savedPlaceIds.includes(placeId)
            ? state.savedPlaceIds.filter((id) => id !== placeId)
            : [placeId, ...state.savedPlaceIds],
        })),
      recordRecentPlace: (placeId) =>
        set((state) => ({
          recentPlaceIds: [placeId, ...state.recentPlaceIds.filter((id) => id !== placeId)].slice(
            0,
            8,
          ),
        })),
      clearRecentPlaces: () => set({ recentPlaceIds: [] }),
    }),
    {
      name: 'trail-local-state',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        city: state.city,
        savedPlaceIds: state.savedPlaceIds,
        recentPlaceIds: state.recentPlaceIds,
      }),
    },
  ),
);
