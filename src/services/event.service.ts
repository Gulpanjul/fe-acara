import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
  //   getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  addEvent: (payload: IEvent) => instance.post(endpoint.EVENT, payload),
  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  //   deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
  //   updateCategory: (id: string, payload: ICategory) =>
  //     instance.put(`${endpoint.CATEGORY}/${id}`, payload),
};

export default eventServices;
