export const loadStyleString = (css, id = '') => {
  if (document.getElementById(id)) return;
  let style = document.createElement('style');
  style.type = 'text/css';
  style.id = id;
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.styleSheet.cssText = css;
  }
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
}


let isServer = false;
/* istanbul ignore next */
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

export function scrollIntoView(container, selected) {
  if (isServer) return;

  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const top = selected.offsetTop;
  const bottom = selected.offsetTop + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}
