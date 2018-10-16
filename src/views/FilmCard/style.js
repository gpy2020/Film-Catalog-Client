export const styles = theme => ({
  card: {
    width: "250px",
    height: "400px",
    backgroundColor: "#6f74dd",
    marginRight: "2.5px",
    marginLeft: "2.5px",
    marginBottom: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ffffff",
      "& $cardText": {
        color: "black"
      }
    }
  },
  imageContainer: {
    width: "200px",
    height: "250px",
    borderRadius: "15px"
  },
  link: {
    textDecoration: "none"
  },
  cardText: {
    color: "#ffffff"
  }
});
