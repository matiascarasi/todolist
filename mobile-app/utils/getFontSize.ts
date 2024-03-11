import { PixelRatio } from "react-native";

export const getFontSize = (size: number) => size / PixelRatio.getFontScale();