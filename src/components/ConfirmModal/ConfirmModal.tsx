import { Modal } from "react-native";
import {
  Backdrop,
  Card,
  Content,
  Headline,
  Message,
  ButtonRow,
  CancelButton,
  CancelButtonText,
  ModalContainer,
  ConfirmButton,
  ConfirmButtonText,
} from "./layouts";

export const ConfirmModal = ({
  visible,
  headline,
  message,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  headline: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onCancel}
  >
    <ModalContainer>
      <Backdrop testID="confirm-backdrop" onPress={onCancel} />
      <Card>
        <Content>
          <Headline>{headline}</Headline>
          <Message>{message}</Message>
          <ButtonRow>
            <ConfirmButton testID="confirm-cancel" onPress={onCancel}>
              <ConfirmButtonText>{cancelLabel}</ConfirmButtonText>
            </ConfirmButton>
            <CancelButton testID="confirm-accept" onPress={onConfirm}>
              <CancelButtonText>{confirmLabel}</CancelButtonText>
            </CancelButton>
          </ButtonRow>
        </Content>
      </Card>
    </ModalContainer>
  </Modal>
);
