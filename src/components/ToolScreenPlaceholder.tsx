import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';

type ToolScreenPlaceholderProps = {
  title: string;
};

export function ToolScreenPlaceholder({
  title,
}: ToolScreenPlaceholderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        Navegação configurada. O cálculo será implementado na próxima etapa.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
});
