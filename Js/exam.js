const axios = require("axios");

Array.prototype.customGroup = function (value) {
  const groupedArr = [];
  this.forEach((userData) => {
    if (userData.hasOwnProperty(value)) {
      console.log(userData[value]);
      groupedArr.push(userData[value]);
    }
  });

  return groupedArr;
};

class Singleton {
  static #instance;
  static #dataArray = [];

  constructor() {
    if (!Singleton.#instance) {
      Singleton.#instance = this;
    }

    return Singleton.#instance;
  }

  static getInstance() {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }

    return Singleton.#instance;
  }

  static async fetchData(url) {
    const { data } = await axios.get(url);
    this.#dataArray.push(...data);
  }

  static getData() {
    return this.#dataArray;
  }
}

const instance1 = Singleton.getInstance();
console.log(instance1);

(async () => {
  await Singleton.fetchData("https://jsonplaceholder.typicode.com/posts");
  const data = Singleton.getData();
  console.log(data.customGroup("title"));
})();
