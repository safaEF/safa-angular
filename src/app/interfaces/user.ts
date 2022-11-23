import { Permission } from '../interfaces/permission';
import {Role} from './role';

export interface User {
  permission: Permission[];
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
}
