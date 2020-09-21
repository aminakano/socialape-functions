# Developer Note

## Frontend
At `login.js` and `signup.js`, trying to use a global theme, which is assigned in `App.js`, there is an error: `TypeError: color.charAt is not a function`.


**Original code**
```
// login.js & signup.js

const styles = theme => ({
  ...theme
});

// App.js
const theme = createMuiTheme({
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto",
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
    }
})
```

**Solution**
```
// login.js & signup.js

const styles = theme => ({
  ...theme.formTheme
});

// App.js
const theme = createMuiTheme({
  formTheme: {
      form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto",
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
    }
  }
})
```
*Reference*
- <https://github.com/mui-org/material-ui/issues/16341>

## Backend
*Reference*
- <https://firebase.google.com/docs/firestore/use-rest-api>

