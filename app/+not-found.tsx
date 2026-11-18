import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>That trail isn’t here.</Text>
        <Text style={styles.description}>Head back to Explore and find somewhere new.</Text>
        <Link href="/" style={styles.link}>
          Back to Explore
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    marginTop: spacing.sm,
  },
  link: {
    alignSelf: 'flex-start',
    color: colors.green,
    fontSize: 15,
    fontWeight: '700',
    marginTop: spacing.xl,
  },
});
