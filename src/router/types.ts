export enum SCREENS {
  Login = "Login",
  SignUp = "SignUp",
  Main = "Main",
  AddEdit = "AddEdit",
  Info = "Info",
}

export type TRootStackParamList = {
  [SCREENS.Login]: undefined;
  [SCREENS.SignUp]: undefined;
  [SCREENS.Main]: undefined;
  [SCREENS.AddEdit]: { entryId: string } | undefined;
  [SCREENS.Info]: undefined;
};
