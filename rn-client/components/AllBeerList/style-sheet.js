import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 25
  },
  flatview: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingTop: 30,
    borderRadius: 2,
    marginHorizontal: 25
  },
  rating: {
    alignSelf: "center",
    flexDirection: "column"
  },
  brewer: {
    opacity: 0.5
  },
  button: {
    color: "#1a8cff",
    alignSelf: "center"
  },
  header: {
    marginHorizontal: 45
  }
});
export const space =
  "                                                                       ";
export default styles;
