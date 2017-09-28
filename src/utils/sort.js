export const nameSortDesc = (a, b) => {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1;
  }
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return 0;
};

export const nameSortAsc = (a, b) => {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return 1;
  }
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return -1;
  }
  return 0;
};

export const dateSortDesc = (a, b) => {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
};
export const dateSortAsc = (a, b) => {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
};
