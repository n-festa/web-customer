export const products = [
  {
    id: "1",
    name: "Cơm Ức Gà Gạo Lứt",
    price: 95000,
    discount: 30,
    merchart: "The Chef Town",
    currentPrice: 80000,
    images: [
      "/images/menu-item1.png",
    ],
    kcal: 366,
    carb: 16,
    protein: 4,
    fat: 2.7,
    cook_method: "Luộc",
    ingredient: [
      {
        name: "Ức gà",
        quantity: 150,
        unit: "gram",
      },
      {
        name: "Gạo lứt",
        quantity: 150,
        unit: "gram",
      },
      {
        name: "Bông cải trắng",
        quantity: 30,
        unit: "gram",
      },
      {
        name: "Ớt chuông",
        quantity: 20,
        unit: "gram",
      },
      {
        name: "Bánh tart",
        quantity: 150,
        unit: "gram",
      },
      {
        name: "Hành lá",
        quantity: 1,
        unit: "muỗng cà phê",
      },
      {
        name: "Tiêu",
        quantity: 1 / 3,
        unit: "muỗng cà phê",
      },
    ],
    distance: 3.2,
    time: 20,
    ratings: 4.5,
  },
  {
    id: "2",
    name: "Salad Gà Cajun Balsamic",
    price: 85000,
    currentPrice: 80000,
    merchart: "An Garden",
    images: [
      "/images/menu-item1.png",
    ],

    kcal: 550,
    carb: 0,
    protein: 0,
    fat: 0,

    cook_method: "Luộc",
    ingredient: [
      {
        name: "Cajun",
        quantity: 0,
        unit: "gram",
      },
      {
        name: "gà",
        quantity: 0,
        unit: "gram",
      },
      {
        name: "salad",
        quantity: 0,
        unit: "gram",
      },
      {
        name: "balsamic",
        quantity: 0,
        unit: "gram",
      },
      {
        name: "sốt",
        quantity: 0,
        unit: "gram",
      },
    ],
    distance: 2,
    time: 15,
    ratings: 4.5,
  },
  {
    id: "3",
    name: "Bò Hầm Pate",
    price: 95000,
    currentPrice: 90000,
    merchart: "The Chef Town",
    images: [
      "/images/menu-item1.png",
    ],
    kcal: 600,
    carb: 0,
    protein: 0,
    fat: 0,
    cook_method: "Hầm",
    ingredient: [
      {
        name: "Bò",
        quantity: 0,
        unit: "gram",
      },
      {
        name: "Pate",
        quantity: 0,
        unit: "gram",
      },
    ],
    distance: 3.2,
    time: 20,
    ratings: 4.5,
  },
];

export default products;
