import React from "react";
import { Modal } from "react-native";
import {
  MenuOverlay,
  MenuBox,
  MenuItem,
  MenuDivider,
  MenuItemLabel,
  MenuItemLabelDanger,
  MenuIcon,
} from "./layouts";

export type TMenuOption = {
  iconName: React.ComponentProps<typeof MenuIcon>["name"];
  label: string;
  onPress: () => void;
  danger?: boolean;
};

type TProps = {
  visible: boolean;
  onClose: () => void;
  options: TMenuOption[];
};

export const HeaderMenu = ({ visible, onClose, options }: TProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="none"
    onRequestClose={onClose}
  >
    <MenuOverlay onPress={onClose}>
      <MenuBox>
        {options.map((option, index) => (
          <React.Fragment key={option.label}>
            {index > 0 && <MenuDivider />}
            <MenuItem
              onPress={() => {
                onClose();
                option.onPress();
              }}
            >
              <MenuIcon
                name={option.iconName}
                danger={option.danger}
              />
              {option.danger ? (
                <MenuItemLabelDanger>{option.label}</MenuItemLabelDanger>
              ) : (
                <MenuItemLabel>{option.label}</MenuItemLabel>
              )}
            </MenuItem>
          </React.Fragment>
        ))}
      </MenuBox>
    </MenuOverlay>
  </Modal>
);
