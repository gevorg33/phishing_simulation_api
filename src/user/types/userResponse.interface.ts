import { User, UserDocument } from '../schemas/user.schema';

export interface UserResponseInterface{
  user: User & { token: string };
}

export interface ExpressRequestInterface extends Request{
  user: UserDocument;
}
