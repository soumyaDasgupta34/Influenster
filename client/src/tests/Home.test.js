import { screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import Home from "../container/Home";
import { BrowserRouter } from "react-router-dom";
import { createPost } from "../redux/slices/postSlice";

const mockStore = configureStore([]);
const errorSpy = jest.spyOn(global.console, "error");
describe("Home Component Tests", () => {
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
        queryData: "ayan",
      },
    });
    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  test("Add post button available check", () => {
    const addPost = component.getByTestId("add-post");
    expect(addPost).toBeInTheDocument();
  });
  test("Add post button click,dialog open", () => {
    const addPost = component.getByTestId("add-post");
    fireEvent.click(addPost);
    const addPostModal = component.getByTestId("add-post-modal");
    expect(addPostModal).toBeInTheDocument();
  });
  test("Post to upload the post", () => {
    const addPost = component.getByTestId("add-post");
    fireEvent.click(addPost);
    const postButton = component.getByTestId("post-button");
    fireEvent.click(postButton);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
  test("Does not log errors in console", () => {
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
