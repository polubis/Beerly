export const makeReducer = (entities: any[]) => {
  const initialState = entities.reduce((prev, { key, value }) => {
    return {
      ...prev,
      [key]: value,
      [`${key}Loading`]: true,
      [`${key}Error`]: ''
    };
  }, {});

  const loadPrefix = 'LOAD';

  const map = entities.reduce((prev, { value, key, updateCallback }) => {
    const baseKey = `${key.toUpperCase()}_${loadPrefix}`;

    return {
      ...prev,
      [baseKey]: () => ({
        [`${key}Loading`]: true,
        [`${key}Error`]: ''
      }),
      [`${baseKey}_SUCCESS`]: (state, action) => ({
        [key]: updateCallback ? updateCallback(state, action) : action[key],
        [`${key}Loading`]: false,
        [`${key}Error`]: ''
      }),
      [`${baseKey}_FAILURE`]: (_, action) => ({
        [key]: value,
        [`${key}Loading`]: false,
        [`${key}Error`]: action.error
      })
    };
  }, {});

  return (state: any = initialState, action: any) => {
    return map.hasOwnProperty(action.type)
      ? { ...state, ...map[action.type](state, action) }
      : state;
  };
};
