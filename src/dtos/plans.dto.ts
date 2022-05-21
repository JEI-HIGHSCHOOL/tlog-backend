import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
export class PlanAddDto {
  @IsArray()
  @ArrayMinSize(1)
  plans: Plan[]
}

export class Plan {
  @IsString()
  id: string;

  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
  @IsString()
  place_name: string;
  @IsOptional()
  @IsString()
  place_phone: string;
  @IsString()
  @IsOptional()
  place_category_group_name: string;
  @IsString()
  @IsOptional()
  place_address: string;
}