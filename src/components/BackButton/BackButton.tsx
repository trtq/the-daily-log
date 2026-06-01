import {
  BackButtonContainer,
  BackButtonIcon,
  BackButtonLabel,
} from "./layouts";

type TProps = {
  onPress: () => void;
};

export const BackButton = ({ onPress }: TProps) => (
  <BackButtonContainer onPress={onPress}>
    <BackButtonIcon />
    <BackButtonLabel>BACK</BackButtonLabel>
  </BackButtonContainer>
);
