import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import SplashScreen from "react-native-splash-screen";

//App
import Navigators from "./tags/Navigators";
import AppReducer from "./reducers/AppReducer";
import { getUserProfile } from "./actions/action";
import { execApi } from "./service/apiService";
import { getUser } from "./service/authService";
import { ERROR, PERSIST_USER } from "./reducers/types";

import { getToken } from "./service/authService";

export default class App extends React.Component {
  state = {
    auth: {
      user: null,
      isAuthenticated: false,
      sessionId: "",
      error: null,
      loading: false
    }
  };
  componentWillMount() {
    SplashScreen.hide();
    getUser().then(data => {
      if (data) {
        this.setState(
          {
            auth: {
              user: data.userEntity,
              isAuthenticated: true,
              sessionId: data.sessionId,
              error: null,
              loading: false
            }
          },
          console.log("State", this.state)
        );
      }
    });
  }

  store = createStore(AppReducer, this.state, applyMiddleware(thunk));

  render() {
    console.log("as", this.store.getState());
    return (
      <Provider store={this.store}>
        <Navigators />
      </Provider>
    );
  }
}
