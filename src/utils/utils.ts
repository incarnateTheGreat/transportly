export const groupBy = (arr, property) => {
  return arr.reduce((acc, curr) => {
    acc[curr[property]] = [...(acc[curr[property]] || []), curr];
    return acc;
  }, {});
};

export const handleNavClick = (path, history) => () => {
  history.push(path);
};

// Create URL Params.
export const encodeQueryData = (objectToParse) => {
  const params = [];

  for (let param in objectToParse) {
    params.push(
      `${encodeURIComponent(param)}=${encodeURIComponent(objectToParse[param])}`
    );
  }

  return params.join("&");
};

export const assignActivePageClass = (current, page) =>
  current === page ? "active" : "";

// Assign classes and sort direction arrows.
export const assignSelectedColumnClass = (col, selectedSortColumn) =>
  selectedSortColumn === col ? "selectedColumn" : "";
