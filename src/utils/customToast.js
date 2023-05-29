import Toast from 'react-native-toast-message';

export const TOAST = {
    show: async ( type, title ) => {
        Toast.show({
            type: 'customToast',
            props: { type: type },      //success//error//warn
            text1: title,
            position: 'bottom',
            bottomOffset: 130,
            autoHide: 'true',
            visibilityTime: 3000,
        });
    },
    hide: async () => {
        Toast.show();
    },
};



