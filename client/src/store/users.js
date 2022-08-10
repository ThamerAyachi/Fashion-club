import axios from "axios";
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
    getLengthUsers: async () => {
      try {
        const res = await instance.get("users/length");

        return res.data.length;
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
    async getUser() {
      try {
        const res = await instance.get("users/user");
        return res;
      } catch (err) {
        return err;
      }
    },
    async updateUser(test, data) {
      try {
        const res = await instance.put(`users/update/${data.id}`, data);
        return res;
      } catch (err) {
        return err;
      }
    },
    async updateAvatar(test, data) {
      const form = new FormData();
      form.append("image", data.image);
      try {
        const res = await axios.post(
          "https://api.imgbb.com/1/upload?key=e6a735fac9ee98b1897034ee6315d69b",
          form
        );
        // const imgUrl = res.data.data.display_url;
        if (res.status === 200) {
          const _res = await instance.put(`users/update/avatar/${data.id}`, {
            imgUrl: res.data.data.display_url,
          });
          return _res.status;
        }
        return 400;
      } catch (err) {
        return err;
      }
    },
  },
};

export default users;
