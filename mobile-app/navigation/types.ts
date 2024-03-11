import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskProps } from '../screens/EditTask';

export type RootStackParamList = {
  Home: { order: "asc" | "desc" };
  EditTask: TaskProps;
  NewTask: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}