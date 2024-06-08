// src/types/express.d.ts
import { IUser } from "../model/userModel"; // Adjust the path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: IUser<string, any>;
    }
  }
}
