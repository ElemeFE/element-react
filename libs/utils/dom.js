export const loadStyleString = (css, id = "") => {
  if (document.getElementById(id)) return;
  let style = document.createElement("style");
  style.type = "text/css";
  style.id = id;
  try {
      style.appendChild(document.createTextNode(css));
  } catch (ex) {
      style.styleSheet.cssText = css;
  }
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}
