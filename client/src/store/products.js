import instance from "../axios";

const products = {
  state: () => ({}),

  actions: {
    async createProduct(t, data) {
      const form = new FormData();
      form.append("file", data.file);
      try {
        const fRes = await instance.post("products/upload", form);
        if (fRes.status !== 201) return { message: "photo not valid" };
        data.imgUrl = fRes.data.data;
        data.price = data.price.toString();
        data.quantity = data.quantity.toString();
        const res = await instance.post("products/create", data);
        return res.status;
      } catch (err) {
        return err;
      }
    },
    async getProducts() {
      try {
        const res = await instance.get("products");
        return res;
      } catch (err) {
        return err;
      }
    },
    async getProductById(r, id) {
      try {
        const res = await instance.get(`/products/single/${id}`);

        return res;
      } catch (err) {
        return err;
      }
    },
    async deleteProductById(t, id) {
      try {
        const res = await instance.delete(`products/${id}`);
        return res;
      } catch (err) {
        return err;
      }
    },
    async updateProduct(t, data) {
      try {
        data.price = data.price.toString();
        data.quantity = data.quantity.toString();
        const res = await instance.put(`products/update/${data.id}`, data);
        return res;
      } catch (err) {
        return err;
      }
    },
    async updateCover(t, data) {
      const form = new FormData();
      form.append("file", data.file);

      try {
        const fRes = await instance.post("products/upload", form);
        if (fRes.status !== 201) return { message: "file not valid" };

        console.log(fRes.data.data);

        const res = await instance.put(`products/update/cover/${data.id}`, {
          imgUrl: fRes.data.data,
        });

        return res.status;
      } catch (err) {
        return err;
      }
    },
  },
};

export default products;
