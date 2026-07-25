import recommendationsData from "../data/recommendations.json";

export const HAS_RECOMMENDATIONS =
  (recommendationsData.recommendations ?? []).length > 0;
