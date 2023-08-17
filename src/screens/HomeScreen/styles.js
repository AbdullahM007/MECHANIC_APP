import { StyleSheet ,Dimensions} from "react-native";
const styles= StyleSheet.create({

   bottomContainer: {
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  bottomText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffff00",
    paddingTop: 10,
  },
  roundButton: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
  },
  goButton: {
    position: "absolute",
    backgroundColor: "#1495ff",
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 110,
    left: Dimensions.get("window").width / 2 - 37,
  },
  goText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    paddingRight: 6,
  },
  balanceButton: {
    position: "absolute",
    backgroundColor: "#1c1c1c",
    paddingVertical: 10,
    paddingHorizontal: 25,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    top: 10,
    left: 130,
    right: 130,
    minWidth: 100,
    width: "auto", // Set width to auto to adjust based on text content
    alignSelf: "center", // Center the button horizontally
  },
  balanceText: {
    // flex: 1,
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center", // Align the text to the center within the button
    textAlign: "center",
  },

});
export default styles;

