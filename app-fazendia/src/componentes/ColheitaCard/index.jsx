import { Image, Text, TouchableOpacity, View } from "react-native"
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from "./style"
import { useContext } from "react";
import { ColheitaContext, ColheitaProvider } from "../../context/colheitaContext";

function ColheitaCard({ date, plantName, id, navigation }) {
  const parseDate = parseISO(date)
  const { getColheitaByID } = useContext(ColheitaContext)

  const formattedDate = format(parseDate, "d 'de' MMMM",
    { locale: ptBR }
  );

  function handleToucha() {
    getColheitaByID(id, navigation)
  }
  return (
    <TouchableOpacity style={styles.colheitaCardContainer} onPress={() => handleToucha()}>
      <View style={{width: 80}}>
        <Image source={require('../../assets/images/colheitaImage.png')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{formattedDate}</Text>
        <Text style={styles.paragraph}>Colheita de {plantName} com um ganho acima do comum.</Text>
      </View>
    </TouchableOpacity>
  )
}

export { ColheitaCard }