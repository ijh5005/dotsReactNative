export const styles = {
    boardStyle: (height, width) => {
      return {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height,
        width
      }
    },
    imgStyle: (height, width) => {
      return {
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0
      }
    },
    bombSection: (width) => {
      return {
        height: 100,
        width,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
      }
    },
    levelSelectSection: (width) => {
      return {
        width,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap"
      }
    },
    levelBox: {
      height: 50,
      width: 50,
      backgroundColor: "#270038",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      margin: 5
    },
    homeBox: {
      height: 50,
      width: 100,
      backgroundColor: "#270038",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      margin: 5
    },
    openLevel: {
      fontSize: 20,
      color: "#b57800"
    },
    lockedLevel: {
      fontSize: 20,
      color: "#fff",
      padding: 2,
      opacity: 0.6,
      fontWeight: "bold"
    }
  }
