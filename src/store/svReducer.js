import { DELETE_SV, EDIT_SV, SUBMIT_SV, GET_KEYWORD } from "./constants"

const initialState = {
    listSV: [{
        masv: '1',
        name: 'Võ Vũ Hy',
        sdt: '1232',
        email: 'vovuhy@123.com'
    },
    {
        masv: '2',
        name: 'Võ Vũ Hiệp',
        sdt: '456789',
        email: 'vovuhiep@123.com'
    }],
    svEdit: {},
}

const svReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case DELETE_SV: {
            state.listSV = [...state.listSV].filter(x => x.masv !== action.payload)
            return { ...state }
        }
        case GET_KEYWORD: {
            // state.keyword = action.payload;
            return { ...state }
        }

        case SUBMIT_SV: {
            let masv = action.payload.masv
            if (state.svEdit.masv) {
                let listSVClone = [...state.listSV]
                listSVClone[listSVClone.findIndex(a => a.masv === masv)] = action.payload
                state.listSV = [...listSVClone]
                state.svEdit = {}
            } else {

                state.listSV = [...state.listSV, { ...action.payload }]
                state.svEdit = {}

            }
            return { ...state }
        }
        case EDIT_SV: {
            if (action.payload) {
                state.svEdit = state.listSV.find(x=>x.masv===action.payload)
            } else {
                state.svEdit = {}
            }
            return { ...state }
        }

        default:
            return { ...state };
    }



};

export default svReducer;