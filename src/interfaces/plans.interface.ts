import { Request } from 'express';
import { Plan } from '@/dtos/plans.dto';
import { RequestWithUser } from './auth.interface';
import { User, UserPlan } from '@prisma/client';



export interface RequestUserWithSearchLocation extends RequestWithUser {
    body: {
        plans: Plan[];
    }
  }

export interface DBPlan {
    id?: string
    place_id: string
    latitude: number
    longitude: number
    place_phone: string
    place_category_group_name: string
    place_address: string
    place_name: string
    userId?: string
    plan_id: string
}


export interface PlanWithOwner {
    plans: Plan[]
    user: User[]
}

export interface PlanWithPlanMetaData extends UserPlan {
    plans: Plan[]
    owner?: User
}
  