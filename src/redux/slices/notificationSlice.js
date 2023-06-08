import { createSlice } from '@reduxjs/toolkit'
import { _REST } from '../../services';
import messaging from '@react-native-firebase/messaging';


const initialState = {
  notificationAllowed:false,
  newNotification: false,
  count: 0,
  competitionNotificationOn: false,
  newAndSeasonalProductNotificationOn: false,
  blogNotificationOn: false,
}

export const notificationSlice = createSlice({
  name: 'notificationSetting',
  initialState,
  reducers: {

    toggleCompetitionON: (state, action) => {
      state.competitionNotificationOn = action.payload
    },
    toggleNewAndSeasonalProductON: (state, action) => {
      state.newAndSeasonalProductNotificationOn = action.payload
    },
    toggleBlogON: (state, action) => {
      state.blogNotificationOn = action.payload
    },
    addNotificationCount: (state) => {
      state.count++;
      state.newNotification = true
    },
    setNotificationPermission: (state,action) => {
      state.notificationAllowed = action.payload
    },
    resetNotificationCount: (state) => {
      state.count=0;
      state.newNotification = false
    },
    resetNotificationSetting: (state) => {
      state.newNotification = false
      state.count = 0
      state.competitionNotificationOn = false
      state.newAndSeasonalProductNotificationOn = false
      state.blogNotificationOn = false
    },
  },
})


// export the slice actions
export const {
  toggleCompetitionON,
  toggleNewAndSeasonalProductON,
  toggleBlogON,
  addNotificationCount,
  setNotificationPermission,
  resetNotificationCount,
  resetNotificationSetting
} = notificationSlice.actions;

// export the default reducer
export default notificationSlice.reducer;


export const setCompetitionSetting = (val) => async dispatch => {
  try {
  (val) ? messaging().subscribeToTopic('competitions') : messaging().unsubscribeFromTopic('competitions')
    dispatch(toggleCompetitionON(val));
  } catch (e) { }
}

export const setNewAndSeasonalProductSetting = (val) => async dispatch => {
  try {
    (val) ? messaging().subscribeToTopic('seasonal_and_new') : messaging().unsubscribeFromTopic('seasonal_and_new')
    dispatch(toggleNewAndSeasonalProductON(val));
  } catch (e) { }
}

export const setBlogSetting = (val) => async dispatch => {
  try {
    (val) ? messaging().subscribeToTopic('blog') : messaging().unsubscribeFromTopic('blog')
    dispatch(toggleBlogON(val));
  } catch (e) { }
}