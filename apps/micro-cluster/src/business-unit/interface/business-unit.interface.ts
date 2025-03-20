export interface IBusinessUnitCreate {
  cluster_id: string;
  code: string;
  name: string;
  is_hq: boolean;
  is_active: boolean;
}

export interface IBusinessUnitUpdate {
  id: string;
  cluster_id?: string;
  code?: string;
  name?: string;
  is_hq?: boolean;
  is_active?: boolean;
}