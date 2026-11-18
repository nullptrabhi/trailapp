import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = 'Finding places…' }: LoadingStateProps) {
  return (
    <View accessibilityRole="progressbar" style={styles.container}>
      <ActivityIndicator color={colors.green} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  label: {
    color: colors.muted,
    fontSize: 14,
    marginLeft: spacing.md,
  },
});
