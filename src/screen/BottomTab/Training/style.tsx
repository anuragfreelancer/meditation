import { StyleSheet } from "react-native";
import { color } from "../../../constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.black,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});
