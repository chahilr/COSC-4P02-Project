import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Greeting from '../components/Greeting.js';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders with or without a name", () => {
  act(() => {
    render(<Greeting />, container);
  });
  expect(container.textContent).toBe("Hi, guest");

  act(() => {
    render(<Greeting name="Jenny" />, container);
  });
  expect(container.textContent).toBe("Welcome, Jenny!");

  act(() => {
    render(<Greeting name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Welcome, Margaret!");
});