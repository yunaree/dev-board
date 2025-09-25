import { DashboardType } from "@prisma/client";
import { IsString, IsNotEmpty, IsEnum, IsInt, Min, MaxLength } from "class-validator";

export class DashboardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string; 

  @IsEnum(DashboardType)
  type!: DashboardType;

  @IsInt()
  @Min(1)
  iconId!: number; // фронтенд буде передавати айді іконки з дозволеного списку

  @IsString()
  @MaxLength(500)
  description?: string;

  @IsInt()
  userId!: number;
}