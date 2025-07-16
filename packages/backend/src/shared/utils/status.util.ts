import { Status } from "@prisma/client";

export function isValidStatus(value: string): value is Status {
  return Object.values(Status).includes(value as Status);
}