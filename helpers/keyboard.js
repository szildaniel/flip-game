
export const handleKeyboard = (e, togglePause, uesrEscaped) => {
  if (e.keyCode === 80 || e.key === "p") {
    togglePause();
  }
  else if (e.keyCode === 27) {
    uesrEscaped();
  }
};
