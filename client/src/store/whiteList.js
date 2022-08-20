const whiteList = {
  state: () => ({}),

  actions: {
    setDefaultData: () => {
      const productList = JSON.parse(localStorage.getItem("product-list"));

      if (!productList) {
        localStorage.setItem("product-list", JSON.stringify([]));
      }
    },

    getWhiteList: () => {
      const productList = JSON.parse(localStorage.getItem("product-list"));

      return productList;
    },

    setWhiteList: (t, data) => {
      try {
        const productList = JSON.parse(localStorage.getItem("product-list"));
        productList.unshift(data);
        localStorage.setItem("product-list", JSON.stringify(productList));
        return data;
      } catch (err) {
        return false;
      }
    },

    removeProductWhiteList: (t, data) => {
      try {
        let productList = JSON.parse(localStorage.getItem("product-list"));

        productList = productList.filter((product) => product.id != data.id);

        localStorage.setItem("product-list", JSON.stringify(productList));
        return true;
      } catch (err) {
        return false;
      }
    },

    removeWhiteList: () => {
      localStorage.setItem("product-list", JSON.stringify([]));
      return;
    },

    isFoundInWhiteList: async (t, data) => {
      const productList = await JSON.parse(
        localStorage.getItem("product-list")
      );
      let result = false;
      productList.forEach((product) => {
        if (data.id == product.id) {
          result = true;
        }
      });
      return result;
    },
  },
};

export default whiteList;
