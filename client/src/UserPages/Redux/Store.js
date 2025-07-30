import {combineReducers, configureStore} from '@reduxjs/toolkit'
import jobsReducer from './Slices/jobsSlices'

const reducer = combineReducers({

    jobsState:jobsReducer
})

 const store=configureStore({
    reducer,
   

})

export default store;