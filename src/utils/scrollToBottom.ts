export const scrollToBottom = (ref: React.RefObject<HTMLElement>) => {
  if (!ref.current) return;
  ref.current.scrollTop = ref.current.scrollHeight;
};
