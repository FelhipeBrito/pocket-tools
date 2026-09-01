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
  calculateDateDifference,
  formatDateInput,
  parseDateInput,
  type DateDifferenceResults,
} from '../utils/dates';
import { formatNumber } from '../utils/formatters';

export function DateDifferenceScreen() {
  const [initialDateInput, setInitialDateInput] = useState('');
  const [finalDateInput, setFinalDateInput] = useState('');
  const [calculation, setCalculation] =
    useState<DateDifferenceResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateInitialDate(value: string) {
    setInitialDateInput(formatDateInput(value));
    setCalculation(null);
    setError(null);
  }

  function updateFinalDate(value: string) {
    setFinalDateInput(formatDateInput(value));
    setCalculation(null);
    setError(null);
  }

  function handleCalculate() {
    const initialTimestamp = parseDateInput(initialDateInput);
    const finalTimestamp = parseDateInput(finalDateInput);

    if (initialTimestamp === null || finalTimestamp === null) {
      setCalculation(null);
      setError('Informe datas válidas no formato DD/MM/AAAA.');
      return;
    }

    if (finalTimestamp < initialTimestamp) {
      setCalculation(null);
      setError('A data final deve ser igual ou posterior à data inicial.');
      return;
    }

    Keyboard.dismiss();
    setError(null);
    setCalculation(
      calculateDateDifference(initialTimestamp, finalTimestamp),
    );
  }

  function handleClear() {
    Keyboard.dismiss();
    setInitialDateInput('');
    setFinalDateInput('');
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
          Descubra quantos dias existem entre duas datas. A data inicial não é
          contada como um dia completo.
        </Text>

        <View style={styles.form}>
          <InputField
            label="Data inicial"
            value={initialDateInput}
            onChangeText={updateInitialDate}
            placeholder="DD/MM/AAAA"
            keyboardType="number-pad"
          />

          <InputField
            label="Data final"
            value={finalDateInput}
            onChangeText={updateFinalDate}
            placeholder="DD/MM/AAAA"
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
              accessibilityLabel="Calcular diferença entre datas"
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
              accessibilityLabel="Limpar datas"
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
              title="Quantidade de dias"
              value={`${calculation.days} ${calculation.days === 1 ? 'dia' : 'dias'}`}
            />

            <ResultCard
              title="Semanas aproximadas"
              value={formatNumber(calculation.approximateWeeks)}
            />

            <ResultCard
              title="Meses aproximados"
              value={formatNumber(calculation.approximateMonths)}
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
