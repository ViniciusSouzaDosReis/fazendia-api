import { Pressable } from "react-native"
import { AntDesign } from '@expo/vector-icons';

import styles from "./styles";

function BackButton({ isAbsolute = false, navigation }) {
  let buttonStyles = [styles.button]
  if(isAbsolute) buttonStyles.push(styles.absolute)

  return (
    <Pressable  onPress={() => navigation.goBack()} style={buttonStyles}>
      <AntDesign name="left" size={24} color="black" />
    </Pressable>
  )
}

export { BackButton }