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
import { formatCurrency, formatNumber, parseNumberInput } from '../utils/formatters';
import { calculateFuelCost, type FuelResults } from '../utils/fuel';

type Calculation = FuelResults & {
  distance: number;
  consumption: number;
};

export function FuelScreen() {
  const [distanceInput, setDistanceInput] = useState('');
  const [consumptionInput, setConsumptionInput] = useState('');
  const [fuelPriceInput, setFuelPriceInput] = useState('');
  const [calculation, setCalculation] = useState<Calculation | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateInput(setter: (value: string) => void, value: string) {
    setter(value);
    setCalculation(null);
    setError(null);
  }

  function handleCalculate() {
    const distance = parseNumberInput(distanceInput);
    const consumption = parseNumberInput(consumptionInput);
    const fuelPrice = parseNumberInput(fuelPriceInput);

    if (distance === null || consumption === null || fuelPrice === null) {
      setCalculation(null);
      setError('Preencha todos os campos com valores válidos.');
      return;
    }

    if (distance <= 0 || consumption <= 0 || fuelPrice <= 0) {
      setCalculation(null);
      setError('Distância, consumo e preço devem ser maiores que zero.');
      return;
    }

    const results = calculateFuelCost(distance, consumption, fuelPrice);

    if (!Object.values(results).every(Number.isFinite)) {
      setCalculation(null);
      setError('Os valores informados geraram um resultado inválido.');
      return;
    }

    Keyboard.dismiss();
    setError(null);
    setCalculation({ distance, consumption, ...results });
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
          Estime o combustível necessário e o custo total de uma viagem.
        </Text>

        <View style={styles.form}>
          <InputField
            label="Distância da viagem (km)"
            value={distanceInput}
            onChangeText={(value) => updateInput(setDistanceInput, value)}
            placeholder="Ex.: 300"
          />

          <InputField
            label="Consumo do veículo (km/L)"
            value={consumptionInput}
            onChangeText={(value) => updateInput(setConsumptionInput, value)}
            placeholder="Ex.: 12"
          />

          <InputField
            label="Preço do combustível (R$/L)"
            value={fuelPriceInput}
            onChangeText={(value) => updateInput(setFuelPriceInput, value)}
            placeholder="Ex.: 6,00"
          />

          {error ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {error}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Calcular custo de combustível"
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
              title="Litros necessários"
              value={`${formatNumber(calculation.requiredLiters)} L`}
              detail={`${formatNumber(calculation.distance)} km ÷ ${formatNumber(calculation.consumption)} km/L`}
            />

            <ResultCard
              title="Custo total estimado"
              value={formatCurrency(calculation.totalCost)}
            />

            <ResultCard
              title="Custo por quilômetro"
              value={`${formatCurrency(calculation.costPerKilometer)}/km`}
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
