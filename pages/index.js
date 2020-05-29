import React from "react";
import Intro from "../components/Intro";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faBomb,
  faCrown,
  faEye,
  faFish,
  faFire,
  faHiking,
  faFighterJet,
  faSpider,
  faStar,
  faHatWizard,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faFighterJet,
  faSpider,
  faStar,
  faHiking,
  faHatWizard,
  faBomb,
  faCrown,
  faEye,
  faFish,
  faFire
);



export default function MyPage() {

  return (
    <Intro />
  );
}

