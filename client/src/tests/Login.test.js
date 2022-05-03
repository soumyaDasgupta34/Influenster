import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import Login from "../container/Login";

const mockStore = configureStore([]);
const errorSpy = jest.spyOn(global.console, "error");

describe("Log in Component Tests", () => {
  let store;
  let component;
  const initialState = {
    isLoading: false,
    data: [],
    comments: {},
    userPosts: [],
    likeChange: true,
    commentChange: true,
    postChange: true,
  };
  beforeEach(() => {
    store = mockStore({
      post: initialState,
      auth: {
        incorrectLogin: false,
      },
    });
    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  test("Sign in button available check", () => {
    const signInButton = component.getByTestId("sign-in-button");
    expect(signInButton).toBeInTheDocument();
  });
  test("Log in check", () => {
    const signInButton = component.getByTestId("sign-in-button");
    fireEvent.click(signInButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
  test("Does not log errors in console", () => {
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
