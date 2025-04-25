import {Slide} from "@/interfaces/slider/SliderInterfaces";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const FaqService = {
  getAnimals: async (): Promise<Slide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/1/evolution-stages`);
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getItems: async (): Promise<Slide[]> => {
    try {
      const response = await fetch(`${API_HOST}/courses/1/items`);
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default FaqService;