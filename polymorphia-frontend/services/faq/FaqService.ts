import {Slide} from "@/interfaces/slider/SliderInterfaces";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/courses/1';

const FaqService = {
  getAnimals: async (): Promise<Slide[]> => {
    try {
      const response = await fetch(`${API_HOST}/evolution-stages`);
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getItems: async (): Promise<Slide[]> => {
    try {
      const response = await fetch(`${API_HOST}/items`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default FaqService;