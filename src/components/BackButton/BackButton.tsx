import {
  BackButtonContainer,
  BackButtonIcon,
  BackButtonLabel,
} from "./layouts";

export const BackButton = ({ onPress }: { onPress: () => void }) => (
  <BackButtonContainer onPress={onPress}>
    <BackButtonIcon />
    <BackButtonLabel>BACK</BackButtonLabel>
  </BackButtonContainer>
);
