import { Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { DatePickerInput } from "../../componentes/DatePickerInput";

import { Input } from '../../componentes/Input'
import { Button } from '../../componentes/Button'

import GlobalStyles from "../../constants/GlobalStyles";
import styles from "./style";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { BackButton } from "../../componentes/BackButton";

function AddColheita({ navigation }) {
  const { createColheita, fazendaId } = useContext(UserContext)

  const [colheita, setColheita] = useState({
    quantidade: '',
    dataColheita: '',
  })
  const [planta, setPlanta] = useState({
    nome: '',
    tipo: '',
    requisitosCrescimento: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState()
  const [isError, setIsError] = useState(false)

  function handleChange(name, value, objectName) {
    setIsError(false)
    if (objectName === 'planta') {
      setPlanta(prevPlanta => ({ ...prevPlanta, [name]: value }))
    } else if (objectName === 'colheita') {
      setColheita(prevColheita => ({ ...prevColheita, [name]: value }))
    }
  };

  function handleDateChange(newDate) {
    setDate(newDate);
  }

  async function handleSubmit() {
    setIsLoading(true)
    try {
      const colheitaReq = {
        colheita,
        planta
      }
      await createColheita(colheitaReq, fazendaId, navigation)
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setColheita(prevColheita => ({ ...prevColheita, dataColheita: date }));
  }, [date]);
  return (
    <SafeAreaView style={[GlobalStyles.mainContainer, styles.main]}>
      <BackButton navigation={navigation} />
      <Text style={GlobalStyles.title}>
        Adicionar Colheita
      </Text>
      <View style={styles.sectionForm}>
        <Text style={GlobalStyles.subTitle}>
          Planta
        </Text>
        <View >
          <View style={styles.twoInputs}>
            <Input
              isError={isError}
              twoInputs
              label='Nome'
              placeholder='Ex: Abobrinha'
              value={planta.nome}
              onChangeText={(text) => handleChange('nome', text, 'planta')}
            />
            <Input
              isError={isError}
              twoInputs
              label='Tipo'
              placeholder='Ex: Fruta'
              value={planta.tipo}
              onChangeText={(text) => handleChange('tipo', text, 'planta')}
            />
          </View>
          <Input
            isError={isError}
            label='Requisitos de Crescimento'
            placeholder='Ex: Muito sol'
            value={planta.requisitosCrescimento}
            onChangeText={(text) => handleChange('requisitosCrescimento', text, 'planta')}
          />
        </View>
      </View>
      <View style={styles.sectionForm}>
        <Text style={GlobalStyles.subTitle}>
          Colheita
        </Text>
        <View>
          <View style={styles.twoInputs}>
            <Input
              isError={isError}
              twoInputs
              label='Quantidade'
              placeholder='Ex: 10'
              value={colheita.quantidade}
              onChangeText={(text) => handleChange('quantidade', text, 'colheita')}
            />
            <DatePickerInput setDate={handleDateChange} date={date} twoInputs isError={isError}/>
          </View>
        </View>
      </View>
      {
        isError ?
          <Text style={{ color: 'red' }}>Erro ao tentar Adicionar uma Colheita. Verifique se os dados informados e tente novamente</Text>
          : null
      }
      <Button isLoading={isLoading} onPress={() => handleSubmit()}>
        Adicionar
      </Button>
    </SafeAreaView>
  )
}

export { AddColheita }