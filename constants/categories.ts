import type { MaterialCommunityIcons } from '@expo/vector-icons';

import type { CategoryFilter } from '@/types/place';

export interface CategoryOption {
  label: CategoryFilter;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const categories: CategoryOption[] = [
  { label: 'All', icon: 'compass-outline' },
  { label: 'Food & drink', icon: 'silverware-fork-knife' },
  { label: 'Outdoors', icon: 'tree-outline' },
  { label: 'Culture', icon: 'bank-outline' },
  { label: 'Wellness', icon: 'spa-outline' },
  { label: 'Shopping', icon: 'shopping-outline' },
];
