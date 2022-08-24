import instance from "../axios";

const orders = {
  stats: () => ({}),

  actions: {
    setDefaultCart: async () => {
      const productList = await JSON.parse(localStorage.getItem("cart-list"));

      if (!productList) {
        localStorage.setItem("cart-list", JSON.stringify([]));
      }
    },

    getCart: async () => {
      const productList = await JSON.parse(localStorage.getItem("cart-list"));

      return productList;
    },

    setCart: async (t, data) => {
      try {
        const productList = await JSON.parse(localStorage.getItem("cart-list"));
        productList.unshift(data);
        localStorage.setItem("cart-list", JSON.stringify(productList));
        return true;
      } catch (err) {
        return false;
      }
    },

    removeProductCart: async (t, data) => {
      try {
        let productList = await JSON.parse(localStorage.getItem("cart-list"));
        productList = productList.filter((p) => p.id != data.id);
        localStorage.setItem("cart-list", JSON.stringify(productList));
        return true;
      } catch (err) {
        return false;
      }
    },

    removeCart: () => {
      localStorage.setItem("cart-list", JSON.stringify([]));
      return;
    },
    isFoundInCart: async (t, data) => {
      const productList = await JSON.parse(localStorage.getItem("cart-list"));
      let result = false;
      productList.forEach((product) => {
        if (data.id == product.id) {
          result = true;
        }
      });
      return result;
    },
    createOrder: async (a, data) => {
      try {
        data.telephone = data.telephone.toString();
        const res = await instance.post("orders/create", data);

        return res;
      } catch (err) {
        return err;
      }
    },
    getOrders: async () => {
      try {
        const res = await instance.get("orders");

        return res;
      } catch (err) {
        return err;
      }
    },
  },
};

export default orders;
