import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native"
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { ColheitaContext } from "../../context/colheitaContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../componentes/Button";
import GlobalStyles from "../../constants/GlobalStyles";
import styles from "./style";
import { BackButton } from "../../componentes/BackButton";

function Colheita({ navigation }) {
  const { colheita } = useContext(ColheitaContext)
  const [isLoading, setIsLoading] = useState(true)
  const id = colheita.id
  const date = colheita.dataColheita
  const parseDate = parseISO(date)

  const formattedDate = format(parseDate, "d 'de' MMMM yyyy",
    { locale: ptBR }
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log(colheita)
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
          <SafeAreaView>
            
            <BackButton isAbsolute navigation={navigation}/>
            <Image
              source={require('../../assets/images/ColheitaBackground.png')}
            />
            <View style={[GlobalStyles.mainContainer]}>
              <View style={styles.textContainer}>
                <Text style={GlobalStyles.title}>Colheita de {colheita.planta.nome}</Text>
                <Text style={styles.dateText}>{formattedDate}</Text>
              </View>
              <View style={[GlobalStyles.section, styles.sectionChange]}>
                <Text style={GlobalStyles.subTitle}>Status</Text>
                <View style={styles.infoContainer}>
                  <View style={styles.infoIconAndText}>
                    <Image
                      source={require('../../assets/images/quantidadeIcon.png')}
                    />
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTitle}>Quantidade</Text>
                      <Text style={GlobalStyles.paragraph}>Quantidade de produtos retirados</Text>
                    </View>
                  </View>
                  <Text style={styles.infoQuantidade}>{colheita.quantidade}</Text>
                </View>
              </View>
              <Button isSecond onPress={() => navigation.navigate('Adicionar Distribuicao')}>Enviar Colheita</Button>
            </View>
          </SafeAreaView>
      }
    </>
  )
}

export { Colheita }