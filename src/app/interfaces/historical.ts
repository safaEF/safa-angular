import { Time } from "@angular/common";

export interface Historical {
    id: number;
    model: string;
    action: string;
    time: Time;
    pre: string;
    post: string;
    field_updated: string
  }
  