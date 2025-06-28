export const handleSearch = (data, searchText, searchFields) => {
  const query = searchText.toLowerCase().trim();

  return data.filter((item) =>
    searchFields.some((field) => {
      const value = getNestedValue(item, field);
      return typeof value === "string" && value.toLowerCase().startsWith(query);
    }),
  );
};

export const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};
