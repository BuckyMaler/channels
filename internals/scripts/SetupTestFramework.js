import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.window = document.defaultView;
window.localStorage = window.sessionStorage = {
  getItem(key) {
    return this[key];
  },
  setItem(key, value) {
    this[key] = value;
  },
  removeItem(key) {
    this[key] = undefined;
  },
};

Enzyme.configure({ adapter: new Adapter() });
