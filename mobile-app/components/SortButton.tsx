import { Image, Pressable } from "react-native";
import { RootStackScreenProps } from "../navigation/types";

export default function SortButton({ route, navigation } : RootStackScreenProps<"Home">) {
    
    const { order } = route.params;
    
    return (
        <Pressable
            onPress={() => { navigation.setParams({ order:  order === "asc" ? "desc" : "asc"  }) }}
            style={{
                marginRight: 16
            }}
        >
            <Image
                source={require("../assets/up-down-arrows-icon.png")}
                style={{
                    width:30,
                    height:30,
                    resizeMode: "contain",
                    transform: [{ rotateY: order === "asc" ? "0deg" : "180deg" }],
                }}
            />
        </Pressable>
    )
}