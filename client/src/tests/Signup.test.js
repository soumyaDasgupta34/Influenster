import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import Signup from "../container/Signup";

const mockStore = configureStore([]);
const errorSpy = jest.spyOn(global.console, "error");
describe("Sign up Component Tests", () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore();
    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
  });
  test("Sign up button rendered", () => {
    const signUpButton = component.getByTestId("sign-up-button");
    expect(signUpButton).toBeInTheDocument();
  });
  test("Sign up button click", () => {
    const signUpButton = component.getByTestId("sign-up-button");
    fireEvent.click(signUpButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
  test("Does not log errors in console", () => {
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
