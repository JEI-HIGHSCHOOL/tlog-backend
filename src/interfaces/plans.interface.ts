import { Request } from 'express';
import { Plan } from '@/dtos/plans.dto';
import { RequestWithUser } from './auth.interface';
import { User, UserPlan } from '@prisma/client';



export interface RequestUserWithSearchLocation extends RequestWithUser {
    body: {
        plans: Plan[];
        title: string;
    }
  }



export interface PlanWithOwner {
    plans: Plan[]
    user: User[]
}

export interface PlanWithPlanMetaData extends UserPlan {
    plans: Plan[]
    owner?: User
    user?: User
}

export interface UserPlanWithOwner {
    plans: UserPlan[]
    owner: User
}

export interface SuggestPlanData {
    new: UserPlan[],
    like: UserPlan[]
}
  