import {Slide} from "@/interfaces/slider/SliderInterfaces";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/polymorphia';

const FaqService = {
  getAnimals: async (): Promise<Slide[]> => {
    try {
      const response = await fetch(`${API_HOST}/animals`);
      const data = await response.json();
      return data.animals;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getItems: async (): Promise<Slide[]> => {
    try {
      const response = await fetch(`${API_HOST}/items`);
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default FaqService;