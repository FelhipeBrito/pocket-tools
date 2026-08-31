import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

type ResultCardProps = {
  title: string;
  value: string;
  detail?: string;
};

export function ResultCard({ title, value, detail }: ResultCardProps) {
  return (
    <View
      accessible
      accessibilityLabel={`${title}: ${value}`}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  title: {
    marginBottom: spacing.xs,
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700',
  },
  detail: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 13,
  },
});
