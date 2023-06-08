import { useState } from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import DatePicker from 'react-native-modern-datepicker';

import styles from './style'

function DatePickerInput({ date, setDate, twoInputs = false, isError = false }) {
  const [isOpen, setIsOpen] = useState(false)
  let styleContainer = [styles.inputContainer]
  let styleInput = [styles.input]
  if (twoInputs) styleContainer.push(styles.twoInputs)
  if (isError) styleInput.push(styles.error)

  function handleChangeDate(newDate) {
    setDate(newDate);
  }
  return (
    <TouchableOpacity style={styleContainer} onPress={() => setIsOpen(!isOpen)}>
      <Text style={styles.label}>Data</Text>
      <View style={styleInput}>
        <Text style={styles.inputPlaceHolder}>
          {date}
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              options={{
                textHeaderColor: '#8EA550',
                mainColor: '#8EA550'
              }}
              mode="calendar"
              onDateChange={handleChangeDate}
              selected={date}
            />
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </TouchableOpacity>
  )
}

export { DatePickerInput }