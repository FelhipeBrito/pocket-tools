import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { colors, radius, spacing } from '../constants/theme';
import { formatNumber, parseNumberInput } from '../utils/formatters';
import {
  calculatePercentageResults,
  type PercentageResults,
} from '../utils/percentage';

type Calculation = PercentageResults & {
  value: number;
  percentage: number;
};

export function PercentageScreen() {
  const [valueInput, setValueInput] = useState('');
  const [percentageInput, setPercentageInput] = useState('');
  const [calculation, setCalculation] = useState<Calculation | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateValue(value: string) {
    setValueInput(value);
    setCalculation(null);
    setError(null);
  }

  function updatePercentage(value: string) {
    setPercentageInput(value);
    setCalculation(null);
    setError(null);
  }

  function handleCalculate() {
    const value = parseNumberInput(valueInput);
    const percentage = parseNumberInput(percentageInput);

    if (value === null || percentage === null) {
      setCalculation(null);
      setError('Informe um valor e uma porcentagem válidos.');
      return;
    }

    if (percentage < 0) {
      setCalculation(null);
      setError('A porcentagem não pode ser negativa.');
      return;
    }

    const results = calculatePercentageResults(value, percentage);

    if (!Object.values(results).every(Number.isFinite)) {
      setCalculation(null);
      setError('Os valores informados são muito grandes.');
      return;
    }

    Keyboard.dismiss();
    setError(null);
    setCalculation({ value, percentage, ...results });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardView}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Text style={styles.description}>
          Calcule a porcentagem de um valor, o aumento e o desconto.
        </Text>

        <View style={styles.form}>
          <InputField
            label="Valor"
            value={valueInput}
            onChangeText={updateValue}
            placeholder="Ex.: 850,00"
          />

          <InputField
            label="Porcentagem (%)"
            value={percentageInput}
            onChangeText={updatePercentage}
            placeholder="Ex.: 15"
          />

          <Text style={styles.hint}>
            Use vírgula ou ponto para informar casas decimais.
          </Text>

          {error ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {error}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Calcular porcentagem"
            onPress={handleCalculate}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </Pressable>
        </View>

        {calculation ? (
          <View style={styles.results}>
            <ResultCard
              title="Porcentagem"
              value={formatNumber(calculation.percentageValue)}
              detail={`${formatNumber(calculation.percentage)}% de ${formatNumber(calculation.value)}`}
            />

            <ResultCard
              title="Com aumento"
              value={formatNumber(calculation.increasedValue)}
              detail={`${formatNumber(calculation.value)} + ${formatNumber(calculation.percentage)}%`}
            />

            <ResultCard
              title="Com desconto"
              value={formatNumber(calculation.discountedValue)}
              detail={`${formatNumber(calculation.value)} - ${formatNumber(calculation.percentage)}%`}
            />
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  description: {
    marginBottom: spacing.lg,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  form: {
    gap: spacing.md,
  },
  hint: {
    color: colors.muted,
    fontSize: 12,
  },
  error: {
    color: '#B42318',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  results: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
});
