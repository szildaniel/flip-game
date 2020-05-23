import React from "react";
import styled from 'styled-components';
import { GameStats } from "../styles/Styled.GameStats";

const PausedInfo = styled.div`
color: black;
`
const BoldText = styled.span`
font-weight: 600;
`

const CurrentGameStats = (props) => {
  console.log(props.isPaused)
  return (
    <GameStats>
      {props.isPaused ? (
        <PausedInfo>Game is <BoldText>paused</BoldText> press <BoldText>[p]</BoldText> to continue.</PausedInfo>
      ) : (
        <>
          <div>
            Total Attempts:{" "}
            <span className="totalClicks">
              {props.cardMatching + props.cardNotMatching}
            </span>
          </div>
          <div>
            Successful:{" "}
            <span className="totalClicks">{props.cardMatching}</span>
          </div>
          <div>
            Failed: <span className="totalClicks">{props.cardNotMatching}</span>
          </div>
        </>
      )}
    </GameStats>
  );
};

export default CurrentGameStats;
