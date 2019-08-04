export type Beer = {
  id: number;
  name: string;
  subName: string;
  description: string;
  type: string;
  kindOf: string;
  brewery: string;
  alcohol: number;
  averageCost: {
    value: number;
    currency: 'zł' | '$';
  };
  rate?: number;
  picture?: string;
  header?: string;
};
