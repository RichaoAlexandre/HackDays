import type { Duration } from '../types/duration';

export const convertSecondsToDurationObject = (totalSeconds: number): Duration => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return { hours, minutes };
};
