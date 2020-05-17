import React from "react";
import { GameStats } from "../styles/Styled.GameStats";


const CurrentGameStats = props => {
  return (
    <GameStats>
      <div>
          Total Attempts: <span className="totalClicks">{Math.round(props.gameClicks/2)}</span>
      </div>
      <div>
          Successful: <span className="totalClicks">
              {props.cardMatching}
          </span>
      </div>
      <div>
          Failed: <span className="totalClicks">
            {props.cardNotMatching > 0 ? props.cardNotMatching : "--"}
          </span>
      </div>
    </GameStats>
  );
};

export default CurrentGameStats;
