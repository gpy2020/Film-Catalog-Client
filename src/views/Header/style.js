export const styles = theme => ({
  appBar: {
    position: "static",
    color: "#ffffff",
    backgroundColor: "#00227b"
  },
  title: {
    marginRight: 20
  },
  buttonText: {
    color: "#ffffff"
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logoutButton: {
    marginLeft: 10,
    marginRight: 10
  },
  link: {
    textDecoration: "none"
  },
  navButtons: {
    marginLeft: 10
  },
  userField: {
    display: "flex",
    alignItems: "center"
  },
  infoField: {
    display: "flex",
    alignItems: "center"
  },
  searchInput: {
    marginRight: 30,
    position: "relative",
    "& input": {
      paddingLeft: 30,
      height: 24,
      borderRadius: 15,
      borderWidth: 0
    }
  },
  searchIcon: {
    color: "gray",
    position: "absolute",
    left: 5,
    top: 2,
    padding: "9px, 8px"
  }
});
