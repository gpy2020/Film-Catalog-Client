export const styles = theme => ({
  "@import": [
    "url(../../public/fonts/font-awesome-4.7.0/css/font-awesome.min.css)"
  ],

  star_rating__input: {
    display: "none"
  },

  star_rating__wrap: {
    display: "inline-block",
    fontSize: "2rem"
  },

  star_rating__ico: {
    color: "yellow",
    float: "right",
    "&:hover:before, &:hover ~ &:before, $star_rating__input:checked ~ &:before": {
      content: '"\\f005"'
    },
    "&:last-child": {
      paddingLeft: 0
    }
  },

  shareButtonsContainer: {
    display: "flex"
  },

  fragment: {
    display: "flex",
    justifyContent: "center"
  },

  root: {
    marginTop: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#6f74dd",
    color: "#ffffff",
    padding: "10px",
    width: 820
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  filmImage: {
    width: "220px",
    height: "320px",
    borderRadius: "15px"
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "20px"
  },
  tabs: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "center"
  },
  galery: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "5px"
  },
  galeryImage: {
    width: "200px",
    height: "200px",
    marginRight: "5px",
    borderRadius: "15px"
  },
  tabContainer: {
    display: "flex",
    justifyContent: "center"
  },
  paragraph: {
    width: 480,
    fontSize: "20px"
  },
  modalImage: {
    width: 480,
    height: 480
  },
  dialog: {
    display: "flex",
    alignItemd: "center",
    justifyContent: "center",
    width: 490,
    height: 490
  },
  warning: {
    color: "red",
    fontWeight: 600
  }
});
