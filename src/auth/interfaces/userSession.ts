import { User } from '../../users/entities/user.entity';
interface SessionInterface {
  sessionId: string;
}
export type UserSession = User & SessionInterface;
