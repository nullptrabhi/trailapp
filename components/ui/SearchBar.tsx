import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, radii, spacing } from '@/constants/theme';

interface SearchBarProps {
  value?: string;
  onChangeText?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  editable?: boolean;
}

export function SearchBar({
  value = '',
  onChangeText,
  onClear,
  placeholder = 'Places, activities, a feeling…',
  autoFocus = false,
  editable = true,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons color={colors.muted} name="magnify" size={22} />
      <TextInput
        accessibilityLabel="Search places and activities"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        editable={editable}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        selectionColor={colors.green}
        style={styles.input}
        value={value}
      />
      {value.length > 0 && onClear ? (
        <Pressable
          accessibilityLabel="Clear search"
          onPress={onClear}
          style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons color={colors.muted} name="close-circle" size={19} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 54,
    paddingHorizontal: spacing.lg,
  },
  clearButton: {
    alignItems: 'center',
    borderRadius: radii.pill,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  pressed: {
    backgroundColor: colors.greenSoft,
  },
  input: {
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    marginLeft: spacing.md,
    paddingVertical: spacing.md,
  },
});
