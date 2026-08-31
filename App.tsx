import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/constants/theme';
import { CompoundInterestScreen } from './src/screens/CompoundInterestScreen';
import { DateDifferenceScreen } from './src/screens/DateDifferenceScreen';
import { FuelScreen } from './src/screens/FuelScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PercentageScreen } from './src/screens/PercentageScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShadowVisible: false,
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontWeight: '700',
            },
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Pocket Tools' }}
          />
          <Stack.Screen
            name="Percentage"
            component={PercentageScreen}
            options={{ title: 'Porcentagem' }}
          />
          <Stack.Screen
            name="CompoundInterest"
            component={CompoundInterestScreen}
            options={{ title: 'Juros Compostos' }}
          />
          <Stack.Screen
            name="Fuel"
            component={FuelScreen}
            options={{ title: 'Combustível' }}
          />
          <Stack.Screen
            name="DateDifference"
            component={DateDifferenceScreen}
            options={{ title: 'Entre Datas' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
