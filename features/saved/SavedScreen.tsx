import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/ui/EmptyState';
import { PlaceCard } from '@/components/ui/PlaceCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, spacing } from '@/constants/theme';
import { getPlacesByIds } from '@/services/places';
import { useTrailStore } from '@/store/useTrailStore';
import type { Place } from '@/types/place';

function openPlace(place: Place) {
  router.push({ pathname: '/place/[id]', params: { id: place.id } });
}

export function SavedScreen() {
  const savedPlaceIds = useTrailStore((state) => state.savedPlaceIds);
  const toggleSavedPlace = useTrailStore((state) => state.toggleSavedPlace);
  const savedPlaces = getPlacesByIds(savedPlaceIds);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Saved" subtitle="A shortlist for another day." />
        {savedPlaces.length === 0 ? (
          <EmptyState
            actionLabel="Explore places"
            description="Tap the bookmark on any place to keep it close for later."
            icon="bookmark-outline"
            onActionPress={() => router.replace('/')}
            title="Your next idea starts here"
          />
        ) : (
          savedPlaces.map((place) => (
            <View key={place.id} style={styles.card}>
              <PlaceCard
                isSaved
                onPress={() => openPlace(place)}
                onToggleSave={() => toggleSavedPlace(place.id)}
                place={place}
              />
            </View>
          ))
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
  card: {
    marginBottom: spacing.md,
  },
});
