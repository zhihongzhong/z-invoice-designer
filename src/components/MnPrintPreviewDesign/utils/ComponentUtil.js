

function getDefaultStyle() {
  return {
  }
}

export function createDefaultComponentProperties(tagName) {
  return {
    tagName,
    attributes: [],
    styles: [],
  }
}

/**
 * pxToString function is a setter which convert a number into string
 * */
function pxToString(value, defaultValue) {
  if(isNaN(parseFloat(value))) {
    return defaultValue;
  }
  return value + 'px';
}

/**
 * create a pxToString function by defaultValue
 * */
function pxToStringFactory(defaultValue) {
  return function(value) {
    return pxToString(value, defaultValue);
  }
}

function isNumber(num) {
  return !isNaN(parseFloat(num));
}

export function getStyleValue(style) {
  if(style.rule === 'number' && !isNumber(style.value)) {
    return style.defaultValue;
  }
  const unit = style.unit || '';
  return style.value + '' + unit;
}


export function style2object(styles) {
  const filteredStyles = styles.filter(style=>style.value !== 'default');
  const styleObj = {};
  for(let i = 0; i < filteredStyles.length; i++) {
    const styleName = filteredStyles[i].name;
    styleObj[styleName] = getStyleValue(filteredStyles[i]);
  }
  return styleObj;
}

export function array2object(array) {
  const attrs = {};
  for(let i = 0; i < array.length; i++) {
    const attrName  = array[i].name;
    attrs[attrName] = array[i].value;
  }
  return attrs;
}


export function createAbsoluteStyle() {
  return [
    {
      name: 'cursor',
      value: 'pointer'
    },
    {
      name: 'margin',
      value: 0,
      setter: pxToStringFactory(0)
    },
    {
      name: 'padding',
      value: 0,
      rule: 'number',
      defaultValue: 'default',
      unit: 'px',
    },
    {
      name: 'left',
      value: 'default',
      rule: 'number',
      defaultValue: 'default',
      unit: 'px',
    },
    {
      name: 'top',
      value: 'default',
      rule: 'number',
      defaultValue: 'default',
      unit: 'px',
    },
    {
      name: 'font-size',
      value: 'default',
      rule: 'number',
      defaultValue: 'default',
      unit: 'px',
    }
  ];
}

export function createHorizontalLineStyle() {
  return [
    {
      name: 'position',
      value: 'absolute'
    },
    {
      name: 'left',
      value: '0',
      unit: 'px'
    },
    {
      name: 'top',
      value: 'default',
      unit: 'px'
    },
    {
      name: 'height',
      value: 1,
      editable: false,
      unit: 'px',
    },
    {
      name: 'width',
      value: '100',
      editable: false,
      unit: '%'
    },
    {
      name: 'background',
      value: '#333333',
      editable: false
    },
    {
      name: 'z-index',
      value: 10
    }
  ];
}

export function createVerticalLineStyle() {
  return [
    {
      name: 'position',
      value: 'absolute'
    },
    {
      name: 'left',
      value: '0',
      unit: 'px'
    },
    {
      name: 'top',
      value: '0',
      unit: 'px'
    },
    {
      name: 'height',
      value: 100,
      unit: '%',
    },
    {
      name: 'width',
      value: '1',
      editable: false,
      unit: 'px'
    },
    {
      name: 'background',
      value: '#333333',
      editable: false
    },
    {
      name: 'z-index',
      value: 10
    }
  ];
}

export function createDefaultContainerStyle() {
  return [
    {
      name: 'height',
      value: 'default',
      rule: 'number',
      defaultValue: 'default',
      unit: 'px'
    }
  ];
}

export function createAttributes(value) {
  return [
    {
      name: 'value',
      value
    }
  ];
}

export function createTitleComponentAttributes(value) {
  const attributes = createAttributes(value);
  attributes.push({
    name: 'prefix',
    value: ''
  });
  attributes.push({
    name: 'suffix',
    value: ''
  });
  return attributes;
}

export function createDataSourceTitleComponentAttributes(value) {
  const attributes = createAttributesWithDataSourceOfItsValue(value);
  attributes.push({
    name: 'prefix',
    value: ''
  });
  attributes.push({
    name: 'suffix',
    value: ''
  });
  return attributes;
}

export function createAttributesWithDataSourceOfItsValue(value) {
  return [
    {
      name: 'value',
      value,
      fromDataSource: true
    }
  ]
}

export function createLabelComponentAttributes(label, value) {
  return [
    {
      name: 'label',
      value: label
    },
    {
      name: 'value',
      value
    }
  ];
}

export function createLabelComponentAttributesWithDataSourceOfItsValue(label, value) {
  const attributes = createLabelComponentAttributes(label, value);
  attributes[1]['fromDataSource'] = true;
  return attributes;
}

export function createLabelComponentAttributesWIthDataSourceAndAuthorityOfItsValue(label, value) {
  const attributes = createLabelComponentAttributesWithDataSourceOfItsValue(label, value);
  attributes.push({
    name: 'authority',
    value: ''
  });
  return attributes;
}

export function createTitleComponentProperties(tagName, value) {
  const property = createDefaultComponentProperties(tagName);
  property.styles = createAbsoluteStyle();
  property.attributes = createAttributes(value);
  return property;
}