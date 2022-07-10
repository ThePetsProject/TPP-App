export const isSubset = (superObj: Object, subObj: Object): boolean => {
  return Object.keys(subObj).every((ele) => {
    if (typeof subObj[ele as keyof typeof subObj] == 'object') {
      return isSubset(
        superObj[ele as keyof typeof superObj],
        subObj[ele as keyof typeof subObj]
      );
    }
    return (
      subObj[ele as keyof typeof subObj] ===
      superObj[ele as keyof typeof superObj]
    );
  });
};
