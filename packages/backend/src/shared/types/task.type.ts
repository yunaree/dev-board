import { Status } from "@prisma/client";


export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number | null;
}