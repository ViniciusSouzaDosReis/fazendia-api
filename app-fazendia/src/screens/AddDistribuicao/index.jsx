import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useContext, useEffect, useState } from "react"

import { Input } from "../../componentes/Input"
import { Button } from "../../componentes/Button"
import { DatePickerInput } from "../../componentes/DatePickerInput"
import { ColheitaContext } from "../../context/colheitaContext"
import GlobalStyles from "../../constants/GlobalStyles"
import styles from "./styles"
import { BackButton } from "../../componentes/BackButton"

function AddDistribuicao({ navigation }) {
  const { createDistribuicaoByIDColheita } = useContext(ColheitaContext)

  const [distribuicao, setDistribuicao] = useState({
    destino: '',
    quantidade: '',
    dataEntrega: '',
  })
  const [date, setDate] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  function handleChange(name, value) {
    setIsError(false)
    setDistribuicao(prevDistribuica => ({ ...prevDistribuica, [name]: value }))
  };

  function handleDateChange(newDate) {
    setDate(newDate);
  }

  async function handleSubmit() {
    setIsLoading(true)
    try {
      await createDistribuicaoByIDColheita(distribuicao, navigation)

    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setDistribuicao(prevDistribuica => ({ ...prevDistribuica, dataEntrega: date }));
  }, [date]);
  return (
    <SafeAreaView style={[GlobalStyles.mainContainer, styles.main]}>
      <BackButton navigation={navigation} />
      <Text style={GlobalStyles.title}>
        Enviar Colheita
      </Text>
      <View style={styles.sectionForm}>
        <Text style={GlobalStyles.subTitle}>
          Informação Distribuição
        </Text>
        <View style={styles.teste}>
          <View style={styles.inputsContainer}>
            <Input isError={isError}
              label='Destino'
              placeholder='Ex: São Paulo'
              value={distribuicao.destino}
              onChangeText={(text) => handleChange('destino', text)}
            />
            <Input isError={isError}
              label='Quantidade'
              placeholder='Ex: 100'
              value={distribuicao.quantidade}
              onChangeText={(text) => handleChange('quantidade', text)}
            />
            <DatePickerInput isError={isError} setDate={handleDateChange} date={date} />
          </View>
        </View>
        {
          isError ?
            <Text style={{ color: 'red' }}>Erro ao tentar Adicionar uma Distribuição. Verifique se os dados informados e tente novamente</Text>
            : null
        }
        <Button isLoading={isLoading} onPress={() => handleSubmit()}>
          Adicionar
        </Button>
      </View>
    </SafeAreaView>
  )
}

export { AddDistribuicao }