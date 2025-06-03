import type { Duration } from '../types/duration';

export type Decision = {
    id?: number;
    title?: string;
    duration?: Duration;
    context?: string;
    number_of_participants?: number;
}
