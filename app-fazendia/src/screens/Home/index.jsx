import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

import { UserContext } from "../../context/userContext";
import styles from './style'
import GlobalStyles from "../../constants/GlobalStyles";
import { ColheitaCard } from "../../componentes/ColheitaCard";
import { Button } from '../../componentes/Button'
import { DistribuicaoCard } from "../../componentes/DistribuicaoCard";
import { FazendaCard } from "../../componentes/FazendaCard";

function Home({ navigation }) {
  const { getFazendaAndColheitaId, user, getColheitaByFazendaId, setFazendaId, getDistribuicoesByFazendaId, getFazendas } = useContext(UserContext)

  const [isLoading, setIsLoading] = useState(true)
  const [colheitas, setColheitas] = useState([])
  const [distribuicoes, setDistribuicoes] = useState([])
  const [fazendas, setFazendas] = useState([])
  const [idsFazendas, setIdsFazendas] = useState([])
  const [teste, setTeste] = useState()

  const id = user.id

  function handleSubmit() {
    navigation.navigate('Adicionar Colheita')
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const ids = await getFazendaAndColheitaId(id);
        if (ids) {
          const colheitasData = await getColheitaByFazendaId(ids.fazendaIds[0]);
          const distribuicoesData = await getDistribuicoesByFazendaId()
          const fazendasData = await getFazendas()
          setFazendaId(ids.fazendaIds[0]);
          setDistribuicoes(distribuicoesData)
          setColheitas(colheitasData);
          setFazendas(fazendasData)
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {
        isLoading
          ? <ActivityIndicator color='#8EA550' size={150} />
          :
          <SafeAreaView style={{ paddingBottom: 50 }}>
            <View style={[GlobalStyles.flexSpaceBetween, styles.header]}>
              <Text style={GlobalStyles.title}>Bom dia!</Text>
              <Image source={require('../../assets/images/userIcon.png')} />
            </View>
            <ScrollView style={GlobalStyles.mainContainer}>
              <View style={[GlobalStyles.section]}>
                <Text style={GlobalStyles.subTitle}>Ultimas Colheitas</Text>
                <View style={styles.CardContainer}>
                  <ScrollView nestedScrollEnabled={true}>
                    <View style={styles.CardScroll}>
                      {colheitas.map((colheita, index) => (
                        <ColheitaCard navigation={navigation} id={colheita.id} key={colheita.id} date={colheita.dataColheita} plantName={colheita.planta.nome} />
                      ))}
                    </View>
                  </ScrollView>
                </View>
                <Button isSecond onPress={() => handleSubmit()}>
                  Adicionar Colheita
                </Button>
              </View>
              <View style={[GlobalStyles.section]}>
                <Text style={GlobalStyles.subTitle}>Ultimas Distribuições</Text>
                <View style={styles.CardContainer}>
                  <ScrollView nestedScrollEnabled={true}>
                    <View style={styles.CardScroll}>
                      {distribuicoes.map((distribuicao, index) => (
                        <DistribuicaoCard key={distribuicao.id} navigation={navigation} cityName={distribuicao.destino} deliveryData={distribuicao.dataEntrega} />
                      ))}
                    </View>
                  </ScrollView>
                </View>
                <Button isSecond onPress={() => handleSubmit()}>
                  Adicionar Colheita
                </Button>
              </View>
              <View style={[GlobalStyles.section]}>
                <Text style={GlobalStyles.subTitle}>Fazendas Próximas</Text>
                <View style={styles.CardContainerFazenda}>
                  <ScrollView nestedScrollEnabled={true}>
                    <View style={styles.CardScroll}>
                      {fazendas.map((fazenda, index) => (
                        <FazendaCard key={fazenda.id} farmName={fazenda.nome} />
                      ))}
                    </View>
                  </ScrollView>
                </View>
                <Button isSecond onPress={() => handleSubmit()}>
                  Adicionar Colheita
                </Button>
              </View>
            </ScrollView>
          </SafeAreaView>
      }
    </>
  )
}

export { Home }