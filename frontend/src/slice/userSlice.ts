import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type userSliceState = {
    type: "Owner" | "MAnager" | "",
    email: string | null,
    fullName: string | null,
    expiration: number | null,
    id: string | null
}

const initialState: userSliceState = {
    type: "",
    email: "",
    fullName: "",
    expiration: 0,
    id: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userSliceState>) => {
            state.type = action.payload.type
            state.email = action.payload.email
            state.fullName = action.payload.fullName
            state.expiration = action.payload.expiration
            state.id = action.payload.id
        },
        removeUser: (state) => {
            state.type = ""
            state.email = ""
            state.fullName = ""
            state.expiration = 0
            state.id = ""
        }
    }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer