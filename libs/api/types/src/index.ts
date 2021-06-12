import { Request } from 'express';

interface User {
  id: string;
}

export type RequestWithUser = Request & { user: User };
