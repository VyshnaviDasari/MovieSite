import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Added a few test cases
test("renders Discover element", () => {
  render(<App />);
  const DiscoverElement = screen.getByText("Discover");
  expect(DiscoverElement).toBeInTheDocument();
});

test("loads 20 movies by clicking on trending", async () => {
  render(<App />);

  // Click on Trending
  fireEvent.click(screen.getByText("Trending"));

  // Wait for page to update with 20 movies
  const items = await screen.findAllByTestId("movie");
  expect(items).toHaveLength(20);
});

test("should load 20 movies returned from API when tried to search", async () => {
  render(<App />);

  const inputNode = screen.getByPlaceholderText("Search Here");
  fireEvent.change(inputNode, { target: { value: "a" } });

  // When searched with "a" - should get 20 results and display on screen
  const items = await screen.findAllByTestId("movie");
  expect(items).toHaveLength(20);
});
