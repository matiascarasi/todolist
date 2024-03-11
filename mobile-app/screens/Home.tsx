import { Button, FlatList, Pressable, ScrollView, Text } from "react-native";
import { RootStackScreenProps } from "../navigation/types";
import TaskCard from "../components/TaskCard";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import LoadingTaskCards from "../components/LoadingTaskCards";

export default function Home({ route, navigation } : RootStackScreenProps<'Home'>) {

    const { order } = route.params;
    const { data: tasks, isLoading, error } = useFetch("http://localhost:3000/tasks?order="+order, [order])

    if(error) return <Text>Error</Text>
    if(isLoading) return <LoadingTaskCards />
    
    return (
        <ScrollView
            contentContainerStyle={{flex:1, justifyContent:"space-around", paddingHorizontal: 25, paddingVertical: 10}}
        >
            <FlatList
                data={tasks}
                renderItem={
                    ({item}) => {
                        const formattedItem = {
                            isDone: item.isdone || false,
                            dueDate: item.duedate && new Date(item.duedate),
                            endDate: item.enddate && new Date(item.enddate),
                            startDate: new Date(item.startdate),
                            ...item
                        }
                        return <TaskCard 
                            onPress={ () => { 
                                navigation.navigate(
                                    "EditTask", 
                                    {
                                        dueDate: item.duedate,
                                        ...item
                                    }
                                ) 
                            }}
                            {...formattedItem}
                        />
                    }
                }
                keyExtractor={item => `taskcard-${item.id}`}
                contentContainerStyle={{ gap: 10 }}
            />
            <Button 
                title="Add Task"
                onPress={()=>{navigation.navigate("NewTask")}}
            />
        </ScrollView>
    )
}