import { render } from "@testing-library/react";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from '../pages/game';
import GameTile from '../components/GameTile';

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
