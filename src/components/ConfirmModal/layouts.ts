import styled from "styled-components/native";
import { s } from "react-native-size-matters";

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Backdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const Card = styled.View`
  align-self: stretch;
  background-color: ${(props) => props.theme.bg};
  border-radius: ${s(9)}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.border};
  overflow: hidden;
  margin-left: ${s(32)}px;
  margin-right: ${s(32)}px;
`;

export const Content = styled.View`
  padding-top: ${s(18)}px;
  padding-bottom: ${s(16)}px;
  padding-left: ${s(20)}px;
  padding-right: ${s(20)}px;
`;

export const Headline = styled.Text`
  font-family: PlayfairDisplay_900Black;
  font-size: ${s(22)}px;
  color: ${(props) => props.theme.ink};
  line-height: ${s(30)}px;
  margin-bottom: ${s(8)}px;
`;

export const Message = styled.Text`
  font-family: LibreBaskerville_400Regular_Italic;
  font-size: ${s(13)}px;
  color: ${(props) => props.theme.ink};
  opacity: 0.6;
  line-height: ${s(20)}px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  gap: ${s(10)}px;
  margin-top: ${s(18)}px;
`;

export const ConfirmButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  flex: 1;
  align-items: center;
  padding-top: ${s(13)}px;
  padding-bottom: ${s(13)}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.border};
`;

export const ConfirmButtonText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(11)}px;
  color: ${(props) => props.theme.ink};
  text-transform: uppercase;
`;

export const CancelButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  flex: 1;
  align-items: center;
  padding-top: ${s(13)}px;
  padding-bottom: ${s(13)}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.accent};
  background-color: ${(props) => props.theme.accent};
`;

export const CancelButtonText = styled.Text`
  font-family: LibreBaskerville_700Bold;
  font-size: ${s(11)}px;
  color: ${(props) => props.theme.accentFg};
  text-transform: uppercase;
`;
