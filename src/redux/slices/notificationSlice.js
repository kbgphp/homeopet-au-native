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
    toggleNewProductON: (state, action) => {
      state.newAndSeasonalProductNotificationOn = action.payload
    },
    toggleBlogON: (state, action) => {
      state.blogNotificationOn = action.payload
    },
    addNotificationCount: (state) => {
      state.count++
    },
    setNotificationPermission: (state,action) => {
      state.notificationAllowed = action.payload
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
  resetNotificationSetting
} = notificationSlice.actions;

// export the default reducer
export default notificationSlice.reducer;


export const setCompetitionSetting = (val) => async dispatch => {
  if (val) {
    messaging()
      .subscribeToTopic('competitions')
      .then(() => console.log('Subscribed to competitions!'));
  } else {
    messaging()
      .unsubscribeFromTopic('competitions')
      .then(() => console.log('UnSubscribed to competitions!'));
  }

  // (val) ? messaging().subscribeToTopic('competitions') : messaging().unsubscribeFromTopic('competitions')

  try {
    dispatch(toggleCompetitionON(val));
  } catch (e) { }
}

export const setNewAndSeasonalProductSetting = (val) => async dispatch => {
  try {
    (val) ? messaging().subscribeToTopic('seasonal_and_new') : messaging().unsubscribeFromTopic('seasonal_and_new')
    dispatch(toggleNewProductON(val));
  } catch (e) { }
}

export const setBlogSetting = (val) => async dispatch => {
  try {
    (val) ? messaging().subscribeToTopic('blog') : messaging().unsubscribeFromTopic('blog')
    dispatch(toggleBlogON(val));
  } catch (e) { }
}