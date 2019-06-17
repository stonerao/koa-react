import reducer from '../reducers/index';
import { createStore } from 'redux' // 引入redux createStore、中间件及compose 
export default createStore(reducer)