

/**
 * @param target {HTMLElement}
 * @param styles {Object}
 * */
export function setStyles(target, styles) {
  console.assert(styles instanceof Object);
  if(target instanceof HTMLElement) {
    Object.keys(styles).forEach(key=> {
      const value = isNaN(parseFloat(styles[key])) ? styles[key] : styles[key] + 'px';
      target.style[key] = value;
    });
  } else {
    const style = {};
    Object.keys(styles).forEach(key=> {
      const value = isNaN(parseFloat(styles[key])) ? styles[key] : styles[key] + 'px';
      style[key] = value;
    })
    target.setStyle(style);
  }
  
}