import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ToolCard } from '../components/ToolCard';
import { colors, spacing } from '../constants/theme';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const tools = [
  {
    route: 'Percentage',
    icon: '%',
    title: 'Porcentagem',
    description: 'Porcentagem, aumento e desconto.',
  },
  {
    route: 'CompoundInterest',
    icon: 'R$',
    title: 'Juros Compostos',
    description: 'Simule juros e aportes mensais.',
  },
  {
    route: 'Fuel',
    icon: '⛽',
    title: 'Combustível',
    description: 'Estime litros e custo da viagem.',
  },
  {
    route: 'DateDifference',
    icon: '📅',
    title: 'Entre Datas',
    description: 'Conte os dias entre duas datas.',
  },
] as const;

export function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.subtitle}>
        Ferramentas simples para o dia a dia
      </Text>

      <View style={styles.grid}>
        {tools.map((tool) => (
          <ToolCard
            key={tool.route}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            onPress={() => navigation.navigate(tool.route)}
          />
        ))}
      </View>

      <Text style={styles.offline}>✓ Funciona offline</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: spacing.md,
  },
  subtitle: {
    marginBottom: spacing.lg,
    color: colors.muted,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  offline: {
    marginTop: 'auto',
    paddingTop: spacing.xl,
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
  },
});
