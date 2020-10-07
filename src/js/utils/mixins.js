const mix = (o1, o2) => {
  for (const key in o2) {
    if (o2.hasOwnProperty(key)) {
      o1[key] = o2[key];
    }
  }
  return o1;
};

const mixins = (...objectList) => objectList.reduce((mixin, o) => mix(mixin, o), {});

export default mixins;
