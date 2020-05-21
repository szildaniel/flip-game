import Router from "next/router";


export const handleKeyboard = (e, togglePause ) => {
  e.stopPropagation()
  if (e.keyCode === 27 || e.key === "Escape") {
    Router.push("/");
    console.log(
      "you escaped the game have to add to local storage abonded one"
    );
  } else if (e.keyCode === 80 || e.key === "p") {
    togglePause();
  }
};
