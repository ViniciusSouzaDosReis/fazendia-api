import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserProvider } from "./src/context/userContext";
import { Login } from "./src/screens/Login";
import { Home } from "./src/screens/Home";
import { AddColheita } from "./src/screens/AddColheita";
import { ColheitaProvider } from "./src/context/colheitaContext";
import { Colheita } from "./src/screens/Colheita";
import { AddDistribuicao } from "./src/screens/AddDistribuicao";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <UserProvider>
      <ColheitaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Login'
              component={Login}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Home'
              component={Home}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Adicionar Colheita'
              component={AddColheita}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Adicionar Distribuicao'
              component={AddDistribuicao}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Colheita'
              component={Colheita}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ColheitaProvider>
    </UserProvider>
  );
}
