
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const GET_VERSION = 'GET_VERSION'

// return to reducer
export const updateProfile = (profile) => {
    return {
        type: UPDATE_PROFILE,
        payload: {
            profile: profile
        }
    }
}
