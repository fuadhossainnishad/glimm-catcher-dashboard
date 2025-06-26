export const mainTheme = {
  token: {
    colorPrimary: "#DB92FE",
    colorInfo: "#DB92FE",
    fontFamily: "inherit",
  },

  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: "#000",
      itemHoverBg: "var(--primary)",
      itemHoverColor: "#fff",
      subMenuItemBg: "var(--demin-primary-50)",
      itemSelectedBg: "var(--primary)",
      itemSelectedColor: "white",
      iconSize: 17,
      itemMarginBlock: 10,
      itemHeight: 56,
      itemPaddingInline: 1,
    },

    Table: {
      headerBg: "var(--primary)",
      headerSplitColor: "white",
      headerColor: "rgb(248, 250, 252)",
      cellFontSize: 16,
      colorText: "black",
      borderColor: "rgba(255, 255, 255, 0.18)",
      footerColor: "rgba(31, 41, 55, 0.88)",
      footerBg: "rgb(79, 106, 167)",
      headerFilterHoverBg: "transparent",
      filterDropdownMenuBg: "#fff",
      filterDropdownBg: "#fff",
      colorPrimary: "red",
      borderColor: "lightGray",
      headerBorderRadius: "0",
    },

    Button: {
      colorPrimary: "#DB92FE",
    },

    Input: {
      colorBorder: "#a2a2a3",
    },
    Select: {
      colorBorder: "#a2a2a3",
    },

    DatePicker: {
      colorBgContainer: "var(--primary)",
      colorPrimary: "var(--primary)",
      colorTextPlaceholder: "#ffffff",
    },
  },
};
