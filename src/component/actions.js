export const LOG_BUTTON_CLICK = 'LOG_BUTTON_CLICK';

export const logButtonClick = (buttonName) => {
    return {
        type: LOG_BUTTON_CLICK,
        payload: `${buttonName}` // payload : action에대한 데이터
    };
};