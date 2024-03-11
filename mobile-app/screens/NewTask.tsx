import { Button, ScrollView, TextInput, View } from "react-native";
import { RootStackScreenProps } from "../navigation/types";
import { useState } from "react";
import { DateType } from "react-native-ui-datepicker";
import DatePickerModal from "../components/DatePickerModal";
import { tasksABMStyles } from "../styles/utils";

export default function NewTask({ navigation } : RootStackScreenProps<'NewTask'>) {
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState<DateType>(new Date());
    
    const createNewTask = async () => {
        try {
            await fetch("http://localhost:3000/tasks/create", {
                method: "POST",
                body: JSON.stringify({ title, content, dueDate }),
                headers: { "content-type": "application/json" }
            });
        } catch(e) {
            console.error(e)
        } finally {
            navigation.goBack()
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
                        placeholder="Write a title..."
                        placeholderTextColor="#808080"
                        value={title}
                        onChangeText={(val)=>setTitle(val)}
                    />
                    <DatePickerModal 
                        date={dueDate}
                        onChange={setDueDate}
                    />
                </View>
                <TextInput
                    placeholder="Write a description..."
                    placeholderTextColor="#808080"
                    value={content}
                    onChangeText={(val)=>setContent(val)}
                    style={tasksABMStyles.content} 
                    multiline
                    numberOfLines={10}
                    maxLength={255}
                />
            </View>
            <View style={tasksABMStyles.actionButtons}>
                <Button
                    title={"Create new Task"}
                    onPress={createNewTask}
                />
            </View>
        </ScrollView>
    )
}