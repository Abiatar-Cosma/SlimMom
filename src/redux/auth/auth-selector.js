export const getModalStatus = (store) => store.auth.showModal;
export const getUser = (store) => store.auth.user;
export const getLoadingStatus = (store) => store.auth.isLoading;
export const getErrorStatus = (store) => store.auth.isError;
export const getLoginStatus = (store) => store.auth.isLogin;
export const getDailyIntake = (store) => store.auth.dailyDiet;
export const getUserDailyDiet = (store) => store.auth.userDailyDiet;
export const getRegistrationStatus = (store) => store.auth.registrationStatus;
