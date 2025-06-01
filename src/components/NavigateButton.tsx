interface NavigateButtonConfig {
  primary?: {
    label: string;
    onClick?: () => void;
  };
  secondary?: {
    label: string;
    onClick?: () => void;
  };
}

export const NavigateButton = (config: NavigateButtonConfig) => {
  const { primary, secondary } = config;

  return (
    <div>
      {secondary && (
        <button type="button" onClick={secondary.onClick}>
          {secondary.label}
        </button>
      )}
      {primary && (
        <button type="submit" onClick={primary.onClick}>
          {primary.label}
        </button>
      )}
    </div>
  );
};
