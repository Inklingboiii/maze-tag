 function defaultColorScheme() {
  return {
    fieldColor: "#09bc09",
    wallColor: "#022626",
    playerColor: "#09bcbc",
    enemyColor: "#dc3f1c",
    trailColor: "#bc6309",
    accentColor: "#bcbc09",
  };
}

 function simpleColorScheme() {
  return {
    fieldColor: "#0f0",
    wallColor: "#000",
    playerColor: "#00f",
    enemyColor: "#f00",
    trailColor: "orange",
    accentColor: "yellow",
  };
}

 function mediterrasianColorScheme() {
  return {
    fieldColor: "#88a764",
    wallColor: "#000",
    playerColor: "#448d7a",
    enemyColor: "#dc3f1c",
    trailColor: "#d8a027",
    accentColor: "#ebe18c",
  };
}

 function bartmanColorScheme() {
  return {
    fieldColor: "#90a830",
    wallColor: "#000018",
    playerColor: "#3078a8",
    enemyColor: "#d86048",
    trailColor: "#ae8125",
    accentColor: "#f0c018",
  };
}

 function technoColorScheme() {
  return {
    fieldColor: "#2ade75",
    wallColor: "#000018",
    playerColor: "#246f91",
    enemyColor: "#f77ec3",
    trailColor: "#523563",
    accentColor: "#fffb19",
  };
}

 function funkymonkeyColorScheme() {
  return {
    fieldColor: "#187818",
    wallColor: "#000018",
    playerColor: "#006048",
    enemyColor: "#c01830",
    trailColor: "#c04830",
    accentColor: "#c0c000",
  };
}

export default [
  simpleColorScheme,
  mediterrasianColorScheme,
  defaultColorScheme,
  bartmanColorScheme,
  technoColorScheme,
  funkymonkeyColorScheme,
];
