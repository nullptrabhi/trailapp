import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/constants/theme';
import type { Place } from '@/types/place';

interface PlaceCardProps {
  place: Place;
  onPress: () => void;
  variant?: 'tile' | 'row' | 'featured';
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function PlaceCard({
  place,
  onPress,
  variant = 'row',
  isSaved = false,
  onToggleSave,
}: PlaceCardProps) {
  const isTile = variant === 'tile';
  const isFeatured = variant === 'featured';

  return (
    <View
      style={[
        styles.container,
        isTile && styles.tileContainer,
        isFeatured && styles.featured,
        !isTile && !isFeatured && styles.rowContainer,
      ]}
    >
      <Pressable
        accessibilityLabel={`${place.name}, ${place.category}, ${place.area}`}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          isTile && styles.tileCard,
          isFeatured && styles.featuredCard,
          !isTile && !isFeatured && styles.rowCard,
          pressed && styles.pressed,
        ]}
      >
        <Image
          resizeMode="cover"
          source={place.image}
          style={[
            styles.image,
            isTile && styles.tileImage,
            isFeatured && styles.featuredImage,
            !isTile && !isFeatured && styles.rowImage,
          ]}
        />
        {isFeatured ? <View style={styles.imageScrim} /> : null}
        <View
          style={[
            styles.copy,
            isTile && styles.tileCopy,
            isFeatured && styles.featuredCopy,
            !isTile && !isFeatured && styles.rowCopy,
          ]}
        >
          {isFeatured ? (
            <Text style={styles.featuredEyebrow}>{place.category.toUpperCase()}</Text>
          ) : (
            <Text numberOfLines={1} style={styles.category}>
              {place.category}
            </Text>
          )}
          <Text numberOfLines={isFeatured ? 2 : 1} style={isFeatured ? styles.featuredName : styles.name}>
            {place.name}
          </Text>
          <View style={styles.location}>
            <MaterialCommunityIcons
              color={isFeatured ? colors.whiteMuted : colors.textSecondary}
              name="map-marker-outline"
              size={14}
            />
            <Text
              numberOfLines={1}
              style={isFeatured ? styles.featuredLocationText : styles.locationText}
            >
              {place.area}, {place.city}
            </Text>
          </View>
        </View>
      </Pressable>
      {onToggleSave ? (
        <Pressable
          accessibilityLabel={isSaved ? `Remove ${place.name} from saved` : `Save ${place.name}`}
          accessibilityRole="button"
          onPress={onToggleSave}
          style={({ pressed }) => [
            styles.saveButton,
            (isTile || isFeatured) && styles.imageSaveButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialCommunityIcons
            color={isSaved ? colors.primary : colors.textPrimary}
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={19}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tileContainer: {
    marginRight: spacing.md,
    width: 232,
  },
  featured: {
    borderColor: 'transparent',
    borderRadius: radii.lg,
    marginBottom: spacing.xl,
  },
  card: {
    overflow: 'hidden',
  },
  tileCard: {
    minHeight: 236,
  },
  featuredCard: {
    height: 274,
    justifyContent: 'flex-end',
  },
  rowCard: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    minHeight: 124,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.88,
  },
  image: {
    backgroundColor: colors.secondaryBackground,
  },
  tileImage: {
    height: 142,
    width: '100%',
  },
  featuredImage: {
    ...StyleSheet.absoluteFill,
    height: undefined,
    width: undefined,
  },
  rowImage: {
    height: 124,
    width: 112,
  },
  imageScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.scrim,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  tileCopy: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  featuredCopy: {
    padding: spacing.xl,
  },
  rowCopy: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  category: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.35,
    textTransform: 'uppercase',
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginTop: spacing.xs,
  },
  featuredEyebrow: {
    color: colors.whiteMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  featuredName: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 34,
    marginTop: spacing.xs,
  },
  location: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  locationText: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: 12,
    marginLeft: 3,
  },
  featuredLocationText: {
    color: colors.whiteMuted,
    flex: 1,
    fontSize: 13,
    marginLeft: 3,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    height: 36,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 36,
  },
  imageSaveButton: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
  },
});
