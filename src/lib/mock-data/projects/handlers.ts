import { DefaultBodyType, HttpResponse } from 'msw';

import { createHTTP } from '../utils';

import { mockProjects } from './data';
import { getConfigValue } from '@/config';

// Handlers
const http = createHTTP(getConfigValue('PROJECTS_API'));
export const handlers = [
  http.post('projects', () => HttpResponse.json(mockProjects, { status: 200 })),
  http.get<DefaultBodyType, undefined>(
    'token',
    () => new HttpResponse(null, { status: 200 })
  ),
];