import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface SectionHeadingProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function SectionHeading({ title, actionLabel, onActionPress }: SectionHeadingProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel && onActionPress ? (
        <Pressable accessibilityRole="button" onPress={onActionPress} hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.25,
  },
  action: {
    color: colors.green,
    fontSize: 13,
    fontWeight: '700',
  },
});
