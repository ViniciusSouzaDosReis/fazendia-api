import { Text, View, ImageBackground } from "react-native";
import { useContext, useState } from "react";
import jwt_decode from "jwt-decode";

import GlobalStyles from "../../constants/GlobalStyles";
import styles from './style'
import { Input } from "../../componentes/Input";
import { Button } from "../../componentes/Button";
import { UserContext } from "../../context/userContext";

function Login({ navigation }) {
  const { login, setToken, setId, setFazendaAndColheitaId } = useContext(UserContext)
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState({
    email: "maria@gmail.com",
    senha: "P@$$w0rd!123"
  })
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(name, value) {
    setIsError(false)
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const token = await login(user, navigation);
      const decoded = jwt_decode(token);
      const id = decoded.userId;
      setToken(token);
      setId(id);
    }
    catch (error) {
      setIsError(true)
    }
    setIsLoading(false);
  }

  return (
    <View style={GlobalStyles.mainContainer}>
      <ImageBackground source={require('../../assets/images/ImageBackground.jpg')} style={styles.WelcomeContainer}>
        <Text style={[GlobalStyles.title, styles.text]}>Ola, bem vindo!</Text>
        <Text style={[GlobalStyles.paragraph, styles.text]}>Faça login e controle sua fazenda. Monitore plantações, clima e tome decisões estratégicas. Entre agora e leve sua produção ao próximo nível!</Text>
      </ImageBackground>
      <View style={styles.wrapperContente}>
        <View style={styles.containerInputs}>
          <Input
            value={user.email}
            label='Email'
            placeholder='email@email.com'
            onChangeText={(text) => handleChange('email', text)}
            isError={isError}
          />
          <Input
            value={user.senha}
            label='Senha'
            placeholder='***'
            secureTextEntry={true}
            onChangeText={(text) => handleChange('senha', text)}
            isError={isError}
          />
        </View>
        {
          isError ?
          <Text style={{color: 'red'}}>Erro ao tentar Fazer Login. Verifique as credencias e tente novamente</Text>
          : null
        }
        <Button onPress={() => handleSubmit()} isLoading={isLoading}>
          Entrar
        </Button>
      </View>
    </View>
  )
}

export { Login };