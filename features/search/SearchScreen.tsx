import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryChip } from '@/components/ui/CategoryChip';
import { EmptyState } from '@/components/ui/EmptyState';
import { PlaceCard } from '@/components/ui/PlaceCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { categories } from '@/constants/categories';
import { colors, spacing } from '@/constants/theme';
import { searchPlaces } from '@/services/places';
import { useTrailStore } from '@/store/useTrailStore';
import type { CategoryFilter, Place } from '@/types/place';

function openPlace(place: Place) {
  router.push({ pathname: '/place/[id]', params: { id: place.id } });
}

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const city = useTrailStore((state) => state.city);
  const savedPlaceIds = useTrailStore((state) => state.savedPlaceIds);
  const toggleSavedPlace = useTrailStore((state) => state.toggleSavedPlace);
  const results = useMemo(
    () => searchPlaces({ city, query, category }),
    [category, city, query],
  );
  const isInitialState = !query.trim() && category === 'All';

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Search" subtitle={`Looking around ${city}`} />
        <SearchBar
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Try a place, activity or area"
          value={query}
        />

        <View style={styles.categories}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((option) => (
              <CategoryChip
                category={option}
                key={option.label}
                onPress={() => setCategory(option.label)}
                selected={category === option.label}
              />
            ))}
          </ScrollView>
        </View>

        {isInitialState ? (
          <View style={styles.empty}>
            <EmptyState
              description="Search a place or activity, or choose a category to start exploring."
              icon="magnify"
              title="What sounds good?"
            />
          </View>
        ) : results.length === 0 ? (
          <View style={styles.empty}>
            <EmptyState
              description={`No matches in ${city} yet. Try another name, area or category.`}
              icon="map-search-outline"
              title="Nothing found this time"
            />
          </View>
        ) : (
          <View style={styles.results}>
            <Text style={styles.resultCount}>
              {results.length} {results.length === 1 ? 'place' : 'places'} to explore
            </Text>
            {results.map((place) => (
              <View key={place.id} style={styles.card}>
                <PlaceCard
                  isSaved={savedPlaceIds.includes(place.id)}
                  onPress={() => openPlace(place)}
                  onToggleSave={() => toggleSavedPlace(place.id)}
                  place={place}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  categories: {
    marginHorizontal: -spacing.lg,
    marginTop: spacing.md,
  },
  categoryList: {
    paddingHorizontal: spacing.lg,
  },
  empty: {
    marginTop: spacing.xl,
  },
  results: {
    marginTop: spacing.xl,
  },
  resultCount: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
});
