import { useTranslation } from "react-i18next";
import { ButtonProps, EtherscanIcon, Popover, TooltipText, IconProps } from "uikit";
import { IconLinkButton } from "./IconLinkButton";

export interface EtherscanLinkButtonProps extends ButtonProps {
  href: string;
  hideTooltip?: boolean;
  iconProps?: IconProps;
}

export const EtherscanLinkButton = ({ href, hideTooltip = false, iconProps, ...props }: EtherscanLinkButtonProps) => {
  const { t } = useTranslation();
  const buttonComponent = (
    <IconLinkButton isExternal href={href} aria-label="etherscan" {...props}>
      <EtherscanIcon {...iconProps} />
    </IconLinkButton>
  );

  if (hideTooltip) {
    return buttonComponent;
  }

  return (
    <Popover label={<TooltipText>{t("View on {{name}}", { name: "Etherscan" })}</TooltipText>}>
      {buttonComponent}
    </Popover>
  );
};
