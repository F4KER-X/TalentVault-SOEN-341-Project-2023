import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'
import jobReducer from './features/job/jobSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer
    }
})