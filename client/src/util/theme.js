export default {
  palette: {
    primary: {
      light: "#df487f",
      main: "#d81b60",
      dark: "#971243",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f381a7",
      main: "#f06292",
      dark: "#a84466",
      contrastText: "#000",
    },
  },
  typography: {
    useNextVariants: true,
  },
  formTheme: {
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto",
      height: "100px",
    },
    pageTitle: {
      margin: "10px auto",
    },
    TextField: {
      margin: "10px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "0.5rem",
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
        "& img": {
          height: "100px",
        },
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#00bcd4",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
};