import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PlaceCard } from '@/components/ui/PlaceCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { colors, radii, spacing } from '@/constants/theme';
import { getPlacesByIds } from '@/services/places';
import { useTrailStore } from '@/store/useTrailStore';
import type { Place } from '@/types/place';

function openPlace(place: Place) {
  router.push({ pathname: '/place/[id]', params: { id: place.id } });
}

export function ProfileScreen() {
  const city = useTrailStore((state) => state.city);
  const savedPlaceIds = useTrailStore((state) => state.savedPlaceIds);
  const recentPlaceIds = useTrailStore((state) => state.recentPlaceIds);
  const clearRecentPlaces = useTrailStore((state) => state.clearRecentPlaces);
  const recentPlaces = getPlacesByIds(recentPlaceIds);

  const confirmClearHistory = () => {
    Alert.alert('Clear recent places?', 'This only clears activity stored on this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: clearRecentPlaces, style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Profile" subtitle="Your Trail, your pace." />

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={styles.profileCopy}>
            <Text style={styles.name}>Mira Shah</Text>
            <Text style={styles.profileNote}>Local preview profile · {city}</Text>
          </View>
          <MaterialCommunityIcons color={colors.muted} name="account-circle-outline" size={24} />
        </View>
        <Text style={styles.disclaimer}>
          No account is connected. Your saved places and activity stay on this device.
        </Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{savedPlaceIds.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{recentPlaceIds.length}</Text>
            <Text style={styles.statLabel}>Explored</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading
            actionLabel={recentPlaces.length > 0 ? 'Clear' : undefined}
            onActionPress={recentPlaces.length > 0 ? confirmClearHistory : undefined}
            title="Recently explored"
          />
          {recentPlaces.length > 0 ? (
            recentPlaces.slice(0, 3).map((place) => (
              <View key={place.id} style={styles.placeCard}>
                <PlaceCard onPress={() => openPlace(place)} place={place} />
              </View>
            ))
          ) : (
            <Text style={styles.emptyHistory}>Places you open will show up here.</Text>
          )}
        </View>

        <View style={styles.section}>
          <SectionHeading title="Settings" />
          <SettingsRow
            icon="bookmark-outline"
            label="Saved places"
            onPress={() => router.push('/saved')}
            value={`${savedPlaceIds.length}`}
          />
          <SettingsRow
            icon="shield-check-outline"
            label="Privacy & local data"
            onPress={() =>
              Alert.alert(
                'Your data, for now',
                'Trail does not require an account in this preview. Bookmarks and recent places are stored locally on this device.',
              )
            }
          />
          <SettingsRow
            icon="information-outline"
            label="About Trail"
            onPress={() =>
              Alert.alert(
                'Trail',
                'A flexible starting point for discovering places and experiences in your city.',
              )
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SettingsRowProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
  value?: string;
}

function SettingsRow({ icon, label, onPress, value }: SettingsRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.settingsRow, pressed && styles.pressed]}
    >
      <MaterialCommunityIcons color={colors.green} name={icon} size={20} />
      <Text style={styles.settingsLabel}>{label}</Text>
      {value ? <Text style={styles.settingsValue}>{value}</Text> : null}
      <MaterialCommunityIcons color={colors.muted} name="chevron-right" size={20} />
    </Pressable>
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
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    padding: spacing.lg,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.greenSoft,
    borderRadius: radii.pill,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  avatarText: {
    color: colors.green,
    fontSize: 21,
    fontWeight: '700',
  },
  profileCopy: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '700',
  },
  profileNote: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3,
  },
  disclaimer: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginHorizontal: spacing.xs,
    marginTop: spacing.md,
  },
  stats: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: spacing.lg,
    paddingVertical: spacing.lg,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3,
  },
  statDivider: {
    backgroundColor: colors.border,
    height: 34,
    width: 1,
  },
  section: {
    marginTop: spacing.xxl,
  },
  placeCard: {
    marginBottom: spacing.md,
  },
  emptyHistory: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.muted,
    fontSize: 14,
    padding: spacing.lg,
  },
  settingsRow: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 58,
    paddingHorizontal: spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
  settingsLabel: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: spacing.md,
  },
  settingsValue: {
    color: colors.muted,
    fontSize: 13,
    marginRight: spacing.sm,
  },
});
