import { Image, Text, TouchableOpacity, View } from 'react-native'

import styles from './style'

function FazendaCard({ farmName }) {
  return (
    <TouchableOpacity style={styles.colheitaCardContainer}>
      <View style={{ width: 80 }}>
        <Image source={require('../../assets/images/farmerBackground.png')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{farmName}</Text>
        <Text style={styles.paragraph}>Vimos que a fazenda {farmName} fica próxima da sua</Text>
      </View>
    </TouchableOpacity>
  )
}

export { FazendaCard }