import { handlers } from '@/lib/mock-data';
import { HttpHandler } from 'msw';
import { setupWorker as baseSetupWorker } from 'msw/browser';

export const setupWorker = (
) => {
  const _handlers = Array.from(
    Object.values({ ...handlers })
  )
    .flat()
    .filter((v) => !!v) as HttpHandler[];

  return baseSetupWorker(..._handlers);
};