import { Article } from "../../../components/Article";
import { render } from "@testing-library/react";
import mockArticle from "./mockArticle.json";
import { ArticleTestIds } from "../../../tests/testIds";

// describe defines the test suite for a specific component
describe(Article, () => {
  // it defines individual test cases for that component
  it("article displays featured image correctly", () => {
    const { getByTestId } = render(<Article article={mockArticle} />);
    const featuredImage = getByTestId(ArticleTestIds.featuredImage);
    expect(featuredImage).toHaveAttribute(
      "field",
      mockArticle.data.featuredImage
    );
  });
});
