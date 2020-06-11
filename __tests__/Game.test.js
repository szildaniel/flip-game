import { render } from "@testing-library/react";
import Game from '../pages/game';
import GameTile from '../components/GameTile';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Game', () => {
    it('should render without errors', () => {
      const {getByText} = render(<Game />)
      const timerNumber = getByText(/4/)
      expect(timerNumber).toBeInTheDocument();
    });  
    it('should render 12 GameTiles components', () => {
      const wrapper = mount(<Game />);
      expect(wrapper.find(GameTile)).toHaveLength(12);
    })
})
