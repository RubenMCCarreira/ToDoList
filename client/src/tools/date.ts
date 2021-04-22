export const zoneDateZone = (date) => {
  let stringValue = String(date || '');
  stringValue = stringValue.slice(0, stringValue.lastIndexOf(':'));
  return stringValue;
};

export const formatDate = (date) => {
  const value = new Date(date);

  return value.toLocaleString();
};
