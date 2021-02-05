import { ADD_DONOR, FETCH_BY_ID, FETCH_DONORS } from '../constant';
import database from '@react-native-firebase/database';

export const addDonor = (donor) => {
    return {
        type: ADD_DONOR,
        payload: donor
    }
}

export const fetchDonor = () => {
    return (dispatch) => {
        database().ref('donors').on('value', (data) => {
            dispatch({
                type: FETCH_DONORS,
                payload: data.val()
            })
        })
    }
}