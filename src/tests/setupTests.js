// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import './rAFshim';

import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

Enzyme.configure({ adapter: new Adapter() });

DotEnv.config({ path: '.env.test' });
Date.now = jest.fn(() => new Date(Date.UTC(2017, 0, 1)).valueOf());