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
    createUser: async (test, data) => {
      try {
        const res = await instance.post("users/create", data);
        return res.request.status;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
};

export default users;
