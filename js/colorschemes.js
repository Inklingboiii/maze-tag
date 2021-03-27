 function defaultColorScheme() {
  return {
    fieldColor: "#09bc09",
    wallColor: "#022626",
    playerColor: "#09bcbc",
    enemyColor: "#dc3f1c",
    trailColor: "#bc6309",
    coinColor: "#bcbc09",
  };
}

 function simpleColorScheme() {
  return {
    fieldColor: "#0f0",
    wallColor: "#000",
    playerColor: "#00f",
    enemyColor: "#f00",
    trailColor: "orange",
    coinColor: "yellow",
  };
}

 function mediterrasianColorScheme() {
  return {
    fieldColor: "#88a764",
    wallColor: "#000",
    playerColor: "#448d7a",
    enemyColor: "#dc3f1c",
    trailColor: "#d8a027",
    coinColor: "#ebe18c",
  };
}

 function bartmanColorScheme() {
  return {
    fieldColor: "#90a830",
    wallColor: "#000018",
    playerColor: "#3078a8",
    enemyColor: "#d86048",
    trailColor: "#ae8125",
    coinColor: "#f0c018",
  };
}

 function technoColorScheme() {
  return {
    fieldColor: "#2ade75",
    wallColor: "#000018",
    playerColor: "#246f91",
    enemyColor: "#f77ec3",
    trailColor: "#523563",
    coinColor: "#fffb19",
  };
}

 function funkymonkeyColorScheme() {
  return {
    fieldColor: "#187818",
    wallColor: "#000018",
    playerColor: "#006048",
    enemyColor: "#c01830",
    trailColor: "#c04830",
    coinColor: "#c0c000",
  };
}

export default [
  simpleColorScheme,
  defaultColorScheme,
  mediterrasianColorScheme,
  bartmanColorScheme,
  technoColorScheme,
  funkymonkeyColorScheme,
];
