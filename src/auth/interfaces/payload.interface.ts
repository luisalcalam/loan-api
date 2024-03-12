import { UserRole } from '../../common/enums/userRoles';

export interface PayloadToken {
  id: string;
  role: UserRole;
  sessionId: string;
}
