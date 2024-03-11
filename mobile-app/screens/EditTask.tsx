import { Button, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { RootStackScreenProps } from "../navigation/types";
import { useState } from "react";
import DatePickerModal from "../components/DatePickerModal";
import { DateType } from "react-native-ui-datepicker";
import { tasksABMStyles } from "../styles/utils";

export type TaskProps = { 
    id: number,
    title: string,
    content?: string,
    isDone?: boolean,
    dueDate: Date,
    endDate?: Date
    startDate: Date
}

export default function EditTask({ navigation, route } : RootStackScreenProps<"EditTask">) {
    
    const { id, title, content, dueDate } = route.params;

    const [titleValue, setTitleValue] = useState(title); 
    const [contentValue, setContentValue] = useState(content);
    const [dateValue, setDateValue] = useState<DateType>(dueDate);
    
    const deleteTask = async () => {
        try {
            await fetch("http://localhost:3000/tasks/"+id, {
                method: "DELETE"
            })
        } catch (e) {
            console.error(e);
        } finally {
            navigation.goBack();
        }
    }

    const saveTask = async () => {
        try {
            await fetch("http://localhost:3000/tasks/"+id, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    title: titleValue,
                    content: contentValue,
                    dueDate: dateValue
                })
            })
        } catch (e) {
            console.error(e);
        } finally {
            navigation.goBack();
        }
    }

    return (
        <ScrollView
            contentContainerStyle={tasksABMStyles.container}
        >
            <View>
                <View style={tasksABMStyles.header}>
                    <TextInput 
                        style={[tasksABMStyles.content, tasksABMStyles.title]} 
                        value={titleValue} 
                        onChangeText={setTitleValue} 
                    />
                    <DatePickerModal 
                        date={dateValue}
                        onChange={setDateValue}
                    />
                </View>
                <TextInput 
                    value={contentValue} 
                    onChangeText={setContentValue} 
                    style={tasksABMStyles.content} 
                    multiline
                    numberOfLines={10}
                    maxLength={255}
                />
            </View>
            <View style={tasksABMStyles.actionButtons}>
                <Button
                    title="Delete Task"
                    color="lightsalmon"
                    onPress={deleteTask}
                />
                <Button
                    title="Save Task"
                    onPress={saveTask}
                />
            </View>
        </ScrollView>
    )
}