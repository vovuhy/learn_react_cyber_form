import { DELETE_SV, EDIT_SV,SUBMIT_SV,GET_KEYWORD } from '../store/constants'

const actDeleteSV = (id) => {
    return {
        type: DELETE_SV,
        payload: id
    }
}
const actEditSV = (masv) => {
    return {
        type: EDIT_SV,
        payload: masv
    }
}

const actSubmitSV = (sv) => {
    return {
        type:SUBMIT_SV,
        payload: sv
      }
}

const actGetKeyword = (keyword) => {
    return {
        type:GET_KEYWORD,
        payload: keyword
      }
}



export { actDeleteSV ,actEditSV,actSubmitSV,actGetKeyword}