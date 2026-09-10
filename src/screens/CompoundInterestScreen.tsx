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
import {
  calculateCompoundInterest,
  type CompoundInterestResults,
} from '../utils/compoundInterest';
import {
  formatCurrency,
  formatNumber,
  parseNumberInput,
} from '../utils/formatters';

type Calculation = CompoundInterestResults & {
  months: number;
  monthlyRate: number;
};

export function CompoundInterestScreen() {
  const [initialCapitalInput, setInitialCapitalInput] = useState('');
  const [monthlyContributionInput, setMonthlyContributionInput] = useState('0');
  const [monthlyRateInput, setMonthlyRateInput] = useState('');
  const [monthsInput, setMonthsInput] = useState('');
  const [calculation, setCalculation] = useState<Calculation | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateInput(setter: (value: string) => void, value: string) {
    setter(value);
    setCalculation(null);
    setError(null);
  }

  function handleCalculate() {
    const initialCapital = parseNumberInput(initialCapitalInput);
    const monthlyContribution = parseNumberInput(monthlyContributionInput);
    const monthlyRate = parseNumberInput(monthlyRateInput);
    const months = parseNumberInput(monthsInput);

    if (
      initialCapital === null ||
      monthlyContribution === null ||
      monthlyRate === null ||
      months === null
    ) {
      setCalculation(null);
      setError('Preencha todos os campos com valores válidos.');
      return;
    }

    if (
      initialCapital < 0 ||
      monthlyContribution < 0 ||
      monthlyRate < 0
    ) {
      setCalculation(null);
      setError('Capital, aporte e taxa não podem ser negativos.');
      return;
    }

    if (initialCapital === 0 && monthlyContribution === 0) {
      setCalculation(null);
      setError('Informe um capital inicial ou aporte maior que zero.');
      return;
    }

    if (!Number.isInteger(months) || months < 1 || months > 1200) {
      setCalculation(null);
      setError('O período deve ser um número inteiro entre 1 e 1.200 meses.');
      return;
    }

    const results = calculateCompoundInterest(
      initialCapital,
      monthlyContribution,
      monthlyRate,
      months,
    );

    if (!Object.values(results).every(Number.isFinite)) {
      setCalculation(null);
      setError('Os valores informados geraram um resultado muito grande.');
      return;
    }

    Keyboard.dismiss();
    setError(null);
    setCalculation({ months, monthlyRate, ...results });
  }

  function handleClear() {
    Keyboard.dismiss();
    setInitialCapitalInput('');
    setMonthlyContributionInput('');
    setMonthlyRateInput('');
    setMonthsInput('');
    setCalculation(null);
    setError(null);
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
          Simule investimentos com taxa mensal e aportes realizados ao fim de
          cada mês.
        </Text>

        <View style={styles.form}>
          <InputField
            label="Capital inicial (R$)"
            value={initialCapitalInput}
            onChangeText={(value) =>
              updateInput(setInitialCapitalInput, value)
            }
            placeholder="Ex.: 1.000,00"
          />

          <InputField
            label="Aporte mensal (R$)"
            value={monthlyContributionInput}
            onChangeText={(value) =>
              updateInput(setMonthlyContributionInput, value)
            }
            placeholder="Ex.: 100,00"
          />

          <InputField
            label="Taxa de juros mensal (%)"
            value={monthlyRateInput}
            onChangeText={(value) => updateInput(setMonthlyRateInput, value)}
            placeholder="Ex.: 1"
          />

          <InputField
            label="Período (meses)"
            value={monthsInput}
            onChangeText={(value) => updateInput(setMonthsInput, value)}
            placeholder="Ex.: 12"
            keyboardType="number-pad"
          />

          {error ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {error}
            </Text>
          ) : null}

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Calcular juros compostos"
              onPress={handleCalculate}
              style={({ pressed }) => [
                styles.button,
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Calcular</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Limpar cálculo de juros compostos"
              onPress={handleClear}
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>Limpar</Text>
            </Pressable>
          </View>
        </View>

        {calculation ? (
          <View style={styles.results}>
            <ResultCard
              title="Valor investido"
              value={formatCurrency(calculation.investedAmount)}
            />

            <ResultCard
              title="Juros acumulados"
              value={formatCurrency(calculation.interestAmount)}
            />

            <ResultCard
              title="Montante final"
              value={formatCurrency(calculation.finalAmount)}
              detail={`${calculation.months} meses a ${formatNumber(calculation.monthlyRate)}% ao mês`}
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
  error: {
    color: '#B42318',
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  results: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
});
