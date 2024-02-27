import { HttpResponse, http } from 'msw';

import { mockProjects } from './data';

// Handlers
export const handlers = [
  http.get('/api/projects', () => HttpResponse.json(mockProjects, { status: 200 })),
];