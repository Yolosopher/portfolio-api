import CONFIG from "@/config";
import axios, { AxiosInstance } from "axios";

class ImageStoreService {
  private origin: string;
  private api_key: string;
  private axiosInstance: AxiosInstance;
  constructor() {
    this.origin = CONFIG.img_store_origin;
    this.api_key = CONFIG.img_store_key;
    this.axiosInstance = axios.create({
      baseURL: this.origin,
      headers: {
        Authorization: `Bearer ${this.api_key}`,
      },
    });
  }
  public async delete(name: string) {
    try {
      const response = await this.axiosInstance({
        method: "DELETE",
        url: `/image/${name}`,
      });

      if (response.status !== 200) {
        throw new Error("Failed to delete image");
      }

      const data = response.data;

      return {
        success: true,
        deleted_image_name: data.deleted_image_name,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

const imageStoreService = new ImageStoreService();

export default imageStoreService;
