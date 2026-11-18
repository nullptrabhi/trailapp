import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryChip } from '@/components/ui/CategoryChip';
import { EmptyState } from '@/components/ui/EmptyState';
import { PlaceCard } from '@/components/ui/PlaceCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { categories } from '@/constants/categories';
import { colors, radii, spacing } from '@/constants/theme';
import { getPlacesByIds, getPlacesForCity } from '@/services/places';
import { useTrailStore } from '@/store/useTrailStore';
import { cities, type CategoryFilter, type City, type Place } from '@/types/place';

function openPlace(place: Place) {
  router.push({ pathname: '/place/[id]', params: { id: place.id } });
}

export function ExploreScreen() {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const city = useTrailStore((state) => state.city);
  const setCity = useTrailStore((state) => state.setCity);
  const savedPlaceIds = useTrailStore((state) => state.savedPlaceIds);
  const recentPlaceIds = useTrailStore((state) => state.recentPlaceIds);
  const toggleSavedPlace = useTrailStore((state) => state.toggleSavedPlace);

  const cityPlaces = useMemo(() => getPlacesForCity(city), [city]);
  const filteredPlaces = useMemo(
    () => (category === 'All' ? cityPlaces : cityPlaces.filter((place) => place.category === category)),
    [category, cityPlaces],
  );
  const recentPlaces = useMemo(() => getPlacesByIds(recentPlaceIds), [recentPlaceIds]);
  const featuredPlace = filteredPlaces[0];
  const popularPlaces = filteredPlaces.filter((place) => place.id !== featuredPlace?.id).slice(0, 5);

  const chooseCity = () => {
    Alert.alert(
      'Choose your city',
      'We’ll use this to shape what you discover.',
      [
        ...cities.map((option: City) => ({
          text: option,
          onPress: () => setCity(option),
        })),
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.wordmark}>trail</Text>
            <Text style={styles.tagline}>Make room for somewhere new.</Text>
          </View>
          <Pressable
            accessibilityLabel={`Choose city. Current city: ${city}`}
            accessibilityRole="button"
            onPress={chooseCity}
            style={({ pressed }) => [styles.cityButton, pressed && styles.pressed]}
          >
            <MaterialCommunityIcons color={colors.green} name="map-marker-outline" size={17} />
            <Text style={styles.cityText}>{city}</Text>
            <MaterialCommunityIcons color={colors.muted} name="chevron-down" size={17} />
          </Pressable>
        </View>

        <Pressable onPress={() => router.push('/search')}>
          <SearchBar editable={false} />
        </Pressable>

        <View style={styles.categorySection}>
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

        <View style={styles.sectionIntro}>
          <Text style={styles.eyebrow}>A FRESH PERSPECTIVE</Text>
          <Text style={styles.headline}>Find your kind of{'\n'}out there.</Text>
          <Text style={styles.introCopy}>
            Places and experiences to make today feel a little different.
          </Text>
        </View>

        {featuredPlace ? (
          <PlaceCard
            isSaved={savedPlaceIds.includes(featuredPlace.id)}
            onPress={() => openPlace(featuredPlace)}
            onToggleSave={() => toggleSavedPlace(featuredPlace.id)}
            place={featuredPlace}
            variant="featured"
          />
        ) : (
          <EmptyState
            actionLabel="Show all places"
            description={`We don’t have ${category.toLocaleLowerCase()} suggestions for ${city} yet.`}
            icon="compass-outline"
            onActionPress={() => setCategory('All')}
            title="More ideas are on the way"
          />
        )}

        {popularPlaces.length > 0 ? (
          <View style={styles.section}>
            <SectionHeading title="A few places to start" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.placeRail}
            >
              {popularPlaces.map((place) => (
                <PlaceCard
                  isSaved={savedPlaceIds.includes(place.id)}
                  key={place.id}
                  onPress={() => openPlace(place)}
                  onToggleSave={() => toggleSavedPlace(place.id)}
                  place={place}
                  variant="tile"
                />
              ))}
            </ScrollView>
          </View>
        ) : null}

        {recentPlaces.length > 0 ? (
          <View style={styles.section}>
            <SectionHeading title="Recently explored" />
            {recentPlaces.map((place) => (
              <View key={place.id} style={styles.recentCard}>
                <PlaceCard
                  isSaved={savedPlaceIds.includes(place.id)}
                  onPress={() => openPlace(place)}
                  onToggleSave={() => toggleSavedPlace(place.id)}
                  place={place}
                />
              </View>
            ))}
          </View>
        ) : null}
        <Text style={styles.footer}>A little inspiration for wherever you are.</Text>
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
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  wordmark: {
    color: colors.green,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -1.6,
  },
  tagline: {
    color: colors.muted,
    fontSize: 12,
    marginTop: -2,
  },
  cityButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
  },
  cityText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 5,
  },
  pressed: {
    opacity: 0.8,
  },
  categorySection: {
    marginHorizontal: -spacing.lg,
    marginTop: spacing.lg,
  },
  categoryList: {
    paddingHorizontal: spacing.lg,
  },
  sectionIntro: {
    marginBottom: spacing.lg,
    marginTop: spacing.xxl,
  },
  eyebrow: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.15,
  },
  headline: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1.1,
    lineHeight: 39,
    marginTop: spacing.sm,
  },
  introCopy: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
    maxWidth: 310,
  },
  section: {
    marginBottom: spacing.xl,
  },
  placeRail: {
    paddingRight: spacing.lg,
  },
  recentCard: {
    marginBottom: spacing.md,
  },
  footer: {
    color: colors.muted,
    fontSize: 12,
    paddingTop: spacing.sm,
    textAlign: 'center',
  },
});
