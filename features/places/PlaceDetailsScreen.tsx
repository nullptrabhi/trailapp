import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/ui/EmptyState';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, radii, spacing } from '@/constants/theme';
import { getPlaceById } from '@/services/places';
import { useTrailStore } from '@/store/useTrailStore';
import type { Place } from '@/types/place';

export function PlaceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = getPlaceById(typeof id === 'string' ? id : '');
  const savedPlaceIds = useTrailStore((state) => state.savedPlaceIds);
  const toggleSavedPlace = useTrailStore((state) => state.toggleSavedPlace);
  const recordRecentPlace = useTrailStore((state) => state.recordRecentPlace);
  const isSaved = place ? savedPlaceIds.includes(place.id) : false;

  useEffect(() => {
    if (place) {
      recordRecentPlace(place.id);
    }
  }, [place, recordRecentPlace]);

  if (!place) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <EmptyState
          actionLabel="Go back"
          description="This place may have moved or is no longer available."
          icon="map-marker-question-outline"
          onActionPress={() => router.back()}
          title="We couldn’t find that place"
        />
      </SafeAreaView>
    );
  }

  const openMaps = (selectedPlace: Place) => {
    const query = encodeURIComponent(`${selectedPlace.name}, ${selectedPlace.address}`);
    void Linking.openURL(`https://maps.google.com/?q=${query}`).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : 'Please try again.';
      Alert.alert('Maps could not be opened', message);
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image resizeMode="cover" source={place.image} style={styles.heroImage} />
          <View style={styles.heroScrim} />
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.heroAction, styles.backButton, pressed && styles.pressed]}
          >
            <MaterialCommunityIcons color={colors.textPrimary} name="arrow-left" size={21} />
          </Pressable>
          <Pressable
            accessibilityLabel={isSaved ? 'Remove from saved places' : 'Save this place'}
            accessibilityRole="button"
            onPress={() => toggleSavedPlace(place.id)}
            style={({ pressed }) => [styles.heroAction, styles.saveButton, pressed && styles.pressed]}
          >
            <MaterialCommunityIcons
              color={isSaved ? colors.primary : colors.textPrimary}
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={21}
            />
          </Pressable>
          <View style={styles.heroCaption}>
            <Text style={styles.heroCategory}>{place.category.toUpperCase()}</Text>
            <Text style={styles.heroTitle}>{place.name}</Text>
            <View style={styles.heroLocation}>
              <MaterialCommunityIcons color={colors.white} name="map-marker-outline" size={16} />
              <Text style={styles.heroLocationText}>
                {place.area}, {place.city}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.description}>{place.description}</Text>

          <View style={styles.infoCard}>
            <InfoRow icon="map-marker-outline" label="Address" value={place.address} />
            <View style={styles.divider} />
            <InfoRow icon="heart-outline" label="Good for" value={place.goodFor} />
            <View style={styles.divider} />
            <InfoRow icon="clock-outline" label="A good time" value={place.bestTime} />
          </View>

          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>A few early impressions</Text>
            <Text style={styles.sectionSubtitle}>
              A small preview from the Trail community.
            </Text>
            {place.notes.map((note) => (
              <View key={`${place.id}-${note.author}`} style={styles.noteCard}>
                <View style={styles.noteHeading}>
                  <View style={styles.noteAvatar}>
                    <MaterialCommunityIcons color={colors.primary} name="account-outline" size={18} />
                  </View>
                  <View style={styles.noteAuthor}>
                    <Text style={styles.noteName}>{note.author}</Text>
                    <Text style={styles.noteOccasion}>{note.occasion}</Text>
                  </View>
                  <MaterialCommunityIcons color={colors.primary} name="chat-processing-outline" size={18} />
                </View>
                <Text style={styles.noteText}>{note.note}</Text>
              </View>
            ))}
          </View>

          <PrimaryButton
            icon="directions"
            label="Open in Maps"
            onPress={() => openMaps(place)}
          />
          <Text style={styles.photoNote}>Photos are illustrative. Check local details before you go.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface InfoRowProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <MaterialCommunityIcons color={colors.primary} name={icon} size={19} />
      <View style={styles.infoCopy}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    height: 350,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    height: undefined,
    width: undefined,
  },
  heroScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.scrim,
  },
  heroAction: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    height: 42,
    justifyContent: 'center',
    position: 'absolute',
    top: spacing.md,
    width: 42,
  },
  backButton: {
    left: spacing.lg,
  },
  saveButton: {
    right: spacing.lg,
  },
  pressed: {
    opacity: 0.78,
  },
  heroCaption: {
    padding: spacing.xl,
  },
  heroCategory: {
    color: colors.whiteMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 31,
    fontWeight: '700',
    letterSpacing: -0.8,
    lineHeight: 37,
    marginTop: spacing.xs,
  },
  heroLocation: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  heroLocationText: {
    color: colors.white,
    fontSize: 13,
    marginLeft: spacing.xs,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  description: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 25,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  infoRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingVertical: spacing.md,
  },
  infoCopy: {
    flex: 1,
    marginLeft: spacing.md,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 3,
  },
  divider: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
  },
  notesSection: {
    marginBottom: spacing.xl,
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.35,
  },
  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  noteCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginTop: spacing.md,
    padding: spacing.lg,
  },
  noteHeading: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  noteAvatar: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radii.pill,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  noteAuthor: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  noteName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  noteOccasion: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  noteText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.md,
  },
  photoNote: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
