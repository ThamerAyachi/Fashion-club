import instance from "../axios";

const messages = {
  state: () => ({}),

  actions: {
    sendMessage: async (test, data) => {
      try {
        const res = await instance.post("messages/send", data);
        return res.request.status;
      } catch (err) {
        return err;
      }
    },
  },
};

export default messages;
