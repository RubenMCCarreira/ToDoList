export const zoneDateZone = (date: string | null) => {
  let stringValue = String(date || '');
  stringValue = stringValue.slice(0, stringValue.lastIndexOf(':'));
  return stringValue;
};

export const formatDate = (date: string) => {
  const value = new Date(date);

  return value.toLocaleString();
};
