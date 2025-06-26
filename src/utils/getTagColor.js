const getTagColor = (value) => {
  let color = "";
  switch (value) {
    case "User":
      color = "green-inverse";
      break;
    case "Hotel Admin":
      color = "geekblue-inverse";
      break;
    case "Apartment Admin":
      color = "blue-inverse";
      break;
    case "Admin":
      color = "volcano-inverse";
  }

  return color;
};

export default getTagColor;
