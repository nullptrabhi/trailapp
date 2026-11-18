import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing } from '@/constants/theme';
import type { CategoryOption } from '@/constants/categories';

interface CategoryChipProps {
  category: CategoryOption;
  selected: boolean;
  onPress: () => void;
}

export function CategoryChip({ category, selected, onPress }: CategoryChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <MaterialCommunityIcons
        color={selected ? colors.white : colors.green}
        name={category.icon}
        size={16}
      />
      <Text style={[styles.label, selected && styles.selectedLabel]}>{category.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    marginRight: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  selectedLabel: {
    color: colors.white,
  },
});
