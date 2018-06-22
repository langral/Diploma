import { AUTH_SUCCESS, AUTH_ERROR } from './loginConstants.jsx'
import { AUTH_KEY } from '../../settings/settings.jsx'
import { setItem, getItem } from '../../utils/localStorageTools.jsx'
import { getUserProfileFromJwt } from '../../utils/jwtTools.jsx'

const initialState = {
    authToken: null,
    userName: null,
    roles: [],
    error: ''
}

export default function authReducer(state = initialState, action) {
    let profile = null;

    switch (action.type) {
        case AUTH_SUCCESS:
            console.log(action);
            setItem(AUTH_KEY, action.data);
            profile = getUserProfileFromJwt(action.data.authToken);
            return {
                userName: profile.name,
                roles: profile.role,
                authToken: profile.authToken
            }

        case AUTH_ERROR:
            return { ...action.data }

        default:
            let stateFormStorage = getItem(AUTH_KEY);

            if (stateFormStorage)
                profile = getUserProfileFromJwt(stateFormStorage.authToken);

            if (profile) state = {
                userName: profile.name,
                roles: profile.role,
                authToken: profile.authToken
            };

            return state;
    }
}