module.exports = () => {
  return new Promise((resolve, reject) => {
    global.mockApiServer.close(resolve);
  });
};
