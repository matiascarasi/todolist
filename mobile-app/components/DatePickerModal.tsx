import { useState } from "react"
import { Button, Image, Modal, Pressable, Text, View } from "react-native"
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

type DatePickerModalProps = {
    date: DateType;
    onChange(date: DateType): void;
}

const DatePickerModal = ({ date, onChange } : DatePickerModalProps) => {
    
    const [modal, setModal] = useState(false);
    
    return (
        <View>
            <Pressable
                onPress={()=>setModal(val=>!val)}
            >
                <Image
                    source={require("../assets/daily-schedule-icon.png")}
                    style={{
                        width: 25,
                        height: 25,
                        resizeMode: "contain"
                    }}
                />
            </Pressable>
            <Modal
                animationType="fade"
                visible={modal}
                onRequestClose={() => {
                    setModal(val=>!val);
                }}
            >
                <DateTimePicker
                    mode="single"
                    date={date}
                    onChange={({date})=>{
                        onChange(date);
                        setModal(false);
                    }}
                    minDate={new Date().setDate(new Date().getDate() - 1)}
                />
            </Modal>
        </View>
    )
}

export default DatePickerModal