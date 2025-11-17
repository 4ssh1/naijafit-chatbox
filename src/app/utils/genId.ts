export const generateMessageId = (): string =>
  `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
