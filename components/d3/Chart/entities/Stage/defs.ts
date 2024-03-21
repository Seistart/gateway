import { CreateDefsFn, DefsSelection } from "../../types"

export const createDefs: CreateDefsFn = function (selection) {
  const defs = selection
    .append("defs")
    .attr("id", "defs")
    .attr("class", "defs")
    .style("display", "none")

  // Icons

  // - Project
  defs
    .append("symbol")
    .attr("id", "icon-project")
    .attr("viewBox", "0 0 19 12") // Use viewBox to scale SVG content
    .append("path")
    .attr(
      "d",
      "M0 2C0 0.895431 0.895431 0 2 0H17C18.1046 0 19 0.895431 19 2L0 2ZM0 4H19V10C19 11.1046 18.1046 12 17 12H2C0.895431 12 0 11.1046 0 10V4ZM5 5H2V7H5V5Z"
    )

  // New NFT icon
  defs
    .append("symbol")
    .attr("id", "icon-nft")
    .attr("viewBox", "0 0 100 125") // Adjust the viewBox to the new SVG's dimension
    .append("path")
    .attr(
      "d",
      "M50.4921 22.1294C50.1867 21.9569 49.8133 21.9569 49.5079 22.1294L26.5079 35.1294C26.1941 35.3068 26 35.6395 26 36V63C26 63.3605 26.1941 63.6932 26.5079 63.8706L49.5079 76.8706C49.8133 77.0431 50.1867 77.0431 50.4921 76.8706L73.4921 63.8706C73.8059 63.6932 74 63.3605 74 63V36C74 35.6395 73.8059 35.3068 73.4921 35.1294L50.4921 22.1294ZM38 43.6161L28 37.7465V61.259L38 55.4256V43.6161ZM49 74.2861L29.0081 62.9863L39.0165 57.1481L49 62.5936V74.2861ZM60.9956 41.8866L50.9518 36.4076L50.9939 24.7104L70.9966 36.0163L60.9956 41.8866ZM48.9518 36.4086L48.9938 24.7174L29.0034 36.0163L39.0152 41.8929L48.9518 36.4086ZM62 43.6161L72 37.7465V61.259L62 55.4256V43.6161ZM60.9835 57.1481L70.9919 62.9863L51 74.2861V62.5936L60.9835 57.1481Z"
    )

  return defs as unknown as DefsSelection
}
