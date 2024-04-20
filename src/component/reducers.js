import { LOG_BUTTON_CLICK } from './actions';

const initialState = {
    all_record: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_BUTTON_CLICK:
            return {
                ...state,
                all_record: [...state.all_record, action.payload]
            };
        default:
            return state;
    }
};
// case LOG_BUTTON_CLICK 에 ...state 역할 : 만약 initialState가 all_record말고 다른 state가 있을때, 
// all_record만 상태변화를 일으키는경우 다른 state값들은 변하면 안되기에 ...state 해주는것입니다.

// ... 연산자 : 기존 속성에 새로운 속성을 추가

export default rootReducer;
