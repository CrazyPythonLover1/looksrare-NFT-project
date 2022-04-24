import { useTranslation } from "react-i18next";
import { Modal, ModalProps } from "uikit";
import { ConnectWalletModalBody } from "./ConnectWalletModalBody";

export type ConnectWalletModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal title={t("Connect Wallet")} isOpen={isOpen} onClose={onClose} size="sm">
      <ConnectWalletModalBody />
    </Modal>
  );
};
