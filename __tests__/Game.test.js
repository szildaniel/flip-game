import React from "react";

import { render } from "@testing-library/react";
import Game from '../pages/game';

describe('Game', () => {
    it('shall render without errors', () => {
      const {getByText} = render(<Game />)
      const timerText = getByText(/4/)
      expect(timerText).toBeInTheDocument();
    });  
})
