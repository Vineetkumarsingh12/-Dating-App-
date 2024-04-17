import { createSlice } from '@reduxjs/toolkit';

const miscSlice = createSlice({
    name: 'misc',
    initialState: {
     isNewGroup:false,
     isAddMember:false,
     isNotification:false,
     isMobile:false,
     isSerach:false,
    isFileMenu:false,
    isDelete:false,
    uploadingLoader:false,
    selectedDeleteChat:{
        chatId:"",
        groupChat:false,
    }



    },
    reducers: {
     setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload;
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload;
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload;
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setIsSerach: (state, action) => {
            state.isSerach = action.payload;
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setIsDelete: (state, action) => {
            state.isDelete = action.payload;
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload;
        },
    },
});

export const {setIsAddMember,setIsDelete,
 setIsFileMenu,setIsMobile,setIsNewGroup,
setSelectedDeleteChat,setUploadingLoader,setIsSerach,setIsNotification } = miscSlice.actions;
export default miscSlice.reducer;