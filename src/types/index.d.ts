export interface IRoute {
  name: string;
  path: string;
  component: string;
  permissions: ProfileRoleEnum[];
}

export enum ProfileRoleEnum {
  Admin = 'ADMIN',
  Professional = 'PROFESSIONAL',
  Responsible = 'RESPONSIBLE',
  Student = 'STUDENT',
}

export interface IUser {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  phone: string;
  profileRole: ProfileRoleEnum;
  id: string;
  avatar?: string;
  professional?: IProfessional;
}

export interface IProfessional {
  bio: string;
  artisticName: string;
  zipcode: string;
  birthday: string;
  user: IUser;
}

export interface IEvent {
  name: string;
  image: string;
  date: string;
  views: number;
  professional: IProfessional;
  id: string;
}
