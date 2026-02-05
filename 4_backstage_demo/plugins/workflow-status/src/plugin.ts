import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const workflowStatusPlugin = createPlugin({
  id: 'workflow-status',
  routes: {
    root: rootRouteRef,
  },
});

export const WorkflowStatusPage = workflowStatusPlugin.provide(
  createRoutableExtension({
    name: 'WorkflowStatusPage',
    component: () =>
      import('./components/GithubWorkflowStatus').then(m => m.GithubWorkflowStatus),
    mountPoint: rootRouteRef,
  }),
);
