const flashMessageBase = {
  blockClass: "vue-flash-message-block-class",
  contentClass: "vue-flash-message-content-class",
  title: "",
  message: "",
  time: 3000
};

export const baseMessage = newObject => {
  return { ...flashMessageBase, ...newObject };
};
