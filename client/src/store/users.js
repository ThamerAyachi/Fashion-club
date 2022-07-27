import instance from "../axios";

const users = {
  state: () => ({}),

  actions: {
    getUsers: async () => {
      try {
        const res = await instance.get("users");
        return res;
      } catch (err) {
        return err;
      }
    },
  },
};

export default users;
