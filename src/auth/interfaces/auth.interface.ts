import { RoleType } from '../../user/dto/user.dto';
export interface PayloadToken {
  role: RoleType;
  sub: string; // sub es el dato del usuario
}
