export function removeIdDeep(obj: any) {
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (typeof item === "object" && item !== null) {
        // If the element is an object, remove the "id" property deeply
        const { id, ...rest } = item;
        for (const key in rest) {
          rest[key] = removeIdDeep(rest[key]);
        }
        return rest;
      }
      return item;
    });
  }

  if (typeof obj === "object" && obj !== null) {
    const result: any = {};
    for (const key in obj) {
      result[key] = removeIdDeep(obj[key]);
    }
    return result;
  }

  return obj;
}

export function updateNestedValue(obj: any, keys: Array<any>, newValue: any) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      if (!isNaN(keys[i + 1])) {
        current[key] = [];
      } else {
        current[key] = {};
      }
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current)) {
    current[parseInt(lastKey, 10)] = newValue;
  } else {
    current[lastKey] = newValue;
  }
}

export function pushNestedValue(obj: any, keys: Array<any>, newValue: any) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current[lastKey])) {
    current[lastKey].push(newValue);
  }
}

export function removeNestedValue(obj: any, keys: Array<any>) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined) {
      // Path doesn't exist, nothing to remove
      return;
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  current.splice(lastKey, 1);
}
