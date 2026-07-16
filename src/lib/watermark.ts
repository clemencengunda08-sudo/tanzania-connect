export const WATERMARK = {
  dataAttr: {
    "data-tr": "tanzaniareach.com",
    "data-protected": "true",
    "data-owner": "Tanzania Reach © 2026",
  },
  htmlComment: "<!-- Tanzania Reach — tanzaniareach.com — Protected UI — Unauthorized copying prohibited -->"
};

export function getWatermarkProps() {
  return WATERMARK.dataAttr;
}
