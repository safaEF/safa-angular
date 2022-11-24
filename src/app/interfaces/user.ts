import { Permission } from '../interfaces/permission';
import {Role} from './role';

export interface User {

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  groups: Role[];
  permissions: Permission[];
  groups_list: Role[];
  permissions_list: Permission[];
}
