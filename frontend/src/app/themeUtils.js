export const applyTheme = (theme) => {
    Object.keys(theme).forEach((key) => {
      const cssVarName = `--${convertCamelToKebabCase(key)}`;
      document.documentElement.style.setProperty(cssVarName, theme[key]);
    });
};

const convertCamelToKebabCase = (str) =>
    str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();