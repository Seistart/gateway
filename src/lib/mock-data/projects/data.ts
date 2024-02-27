
  import { faker } from '@faker-js/faker';
  
import { insertProjectSchema } from '@/lib/db/schema/projects';
import { getMockFn } from '@/utils/mock-server';
  
  export const getMockProjects = getMockFn(insertProjectSchema.array());
  
  export const mockProjects = getMockProjects({
    length: 5,
    overrides: [
      {
        projectName: 'testproject',
      },
      {
        projectName: 'anotheroneproject',
      },
    ]
  });
  
  export const getMockProject = getMockFn(insertProjectSchema);
  export const mockProject = getMockProject({
    overrideFn: (entry) => ({
      ...entry,
      projectType: 'Dex',
    }),
  });