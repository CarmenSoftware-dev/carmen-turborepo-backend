export interface IClusterCreate {
  code: string;
  name: string;
  is_active: boolean;
}

export interface IClusterUpdate {
  id: string;
  code?: string;
  name?: string;
  is_active?: boolean;
}

