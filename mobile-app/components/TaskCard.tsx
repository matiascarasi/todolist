import { useState } from 'react';
import { Switch, View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { TaskProps } from '../screens/EditTask';
import { getFontSize } from '../utils/getFontSize';

const TaskCard = ({ id, title, onPress, dueDate, isDone, endDate, startDate } : TaskProps & { onPress(): void }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [toggle, setToggle] = useState(isDone);
    const [endDateValue, setEndDateValue] = useState<Date | undefined>(endDate);

    const ackTask = async (ack: boolean) => {
        setIsLoading(true);
        try {
            await fetch("http://localhost:3000/tasks/ack/"+id, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    isDone: ack
                })
            });
            setEndDateValue(prev => prev ? undefined : new Date());
            setToggle(prev=>!prev);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View
            style={styles.card}
        >
            <Switch
                value={toggle}
                onValueChange={ackTask}
                disabled={isLoading}
            />
            <Pressable
                onPress={onPress}
                style={styles.container}
            >
                <View>
                    <Text style={styles.title}>{ title }</Text>
                    {
                        endDateValue ?
                            <Text>Started: {startDate.toLocaleDateString()} - Ended: { endDateValue.toLocaleDateString() }</Text> :
                            <Text>Due date: {dueDate?.toLocaleDateString() || "Not defined"}</Text>
                        }
                </View>
                {
                    endDateValue ? 
                        <Image
                            source={require("../assets/booking-confirmed-icon.png")}
                            style={styles.calendarIcon}
                        /> :
                        dueDate.getTime() < new Date().getTime() ?
                            <Image source={require("../assets/booking-cancel-icon.png")} style={styles.calendarIcon}/> :
                            dueDate.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000?
                                <Image source={require("../assets/date-expired-icon.png")} style={styles.calendarIcon}/> :
                                <Image source={require("../assets/booking-pending-icon.png")} style={styles.calendarIcon}/>                                
                }
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        borderBottomColor: "#D4D4D4",
        borderBottomWidth: 1,
        paddingBottom: 4
    },
    title: {
        fontSize: getFontSize(20)
    },
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    calendarIcon: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    }
})

export default TaskCard