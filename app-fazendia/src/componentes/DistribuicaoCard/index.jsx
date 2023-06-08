import { Image, Text, TouchableOpacity, View } from 'react-native'
import { parseISO, format  } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './style'

function DistribuicaoCard({ navigation, cityName, deliveryData }) {
  // const { getColheitaByID } = useContext(ColheitaContext)
  const parseDate = parseISO(deliveryData);

  const formattedDate = format(parseDate, "d 'de' MMMM yyyy", { locale: ptBR });
  
  return (
    <TouchableOpacity style={styles.colheitaCardContainer}>
      <View style={{ width: 80 }}>
        <Image source={require('../../assets/images/cityBackGround.png')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{cityName}</Text>
        <Text style={styles.paragraph}>A entrega sera feita dia {formattedDate}</Text>
      </View>
    </TouchableOpacity>
  )
}

export { DistribuicaoCard }