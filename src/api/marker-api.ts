import { AxiosError, AxiosResponse } from "axios";
import { AddMarkerReq, AddMarkerResponse, GetAllMarkerResponse } from "../types";
import api from "./api";

export const addNewMarker = (request: AddMarkerReq): Promise<AddMarkerResponse> => {
    return new Promise((resolve, reject) => {
      api
        .post("/api/markers/create", request)
        .then((response: AxiosResponse<AddMarkerResponse>) => {
          resolve(response.data); 
        })
        .catch((err: AxiosError) => {
          reject(err); // Reject the promise with the error
        });
    });
  };

  

  export const GetAllMarkers = (): Promise<GetAllMarkerResponse[]> => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/markers", )
        .then((response: AxiosResponse<GetAllMarkerResponse[]>) => {
          resolve(response.data); // Return the response data directly
        })
        .catch((err: AxiosError) => {
          reject(err); // Reject the promise with the error
        });
    });
  };
