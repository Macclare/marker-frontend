export interface AddMarkerReq {
    millName: string;
  latitude: number;
  longitude: number;
  p1Amount: number;
  numTransactions: number;
  p1PriceTon: number;
  lastTransactionDate: string;
}

export interface AddMarkerResponse {
    id: string;
    millName: string;
  latitude: number;
  longitude: number;
  p1Amount: number;
  numTransactions: number;
  p1PriceTon: number;
  lastTransactionDate: string;
}

export interface GetAllMarkerResponse {
    id: string;
    millName: string;
  latitude: number;
  longitude: number;
  p1Amount: number;
  numTransactions: number;
  p1PriceTon: number;
  lastTransactionDate: string;
}

export interface GeneralResponse<T> {
    message: string;
    data: T
}