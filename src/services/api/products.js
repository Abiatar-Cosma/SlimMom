import instance from "./auth";

export const getProductsByQuery = async (query) => {
  const { data } = await instance.get(
    `/products?q=${encodeURIComponent(query)}`,
    {
      headers: {
        "Cache-Control": "no-cache", // să evităm cache
      },
    }
  );
  return data;
};

// corect: date trebuie să fie obiect cu proprietatea `date`
export const getDailyMeals = async (payload) => {
  const { data } = await instance.post(
    "/dailynutritions/getdailymeals",
    payload
  );
  return data;
};

export const addMeal = async (newMeal) => {
  const { data } = await instance.post("/dailynutritions/addmeal", newMeal);
  return data;
};

export const deleteMeal = async (mealId) => {
  const { data } = await instance.delete(`/dailynutritions/${mealId}`);
  return data;
};
