import { createDevApp } from '@backstage/dev-utils';
import { workflowStatusPlugin, WorkflowStatusPage } from '../src/plugin';

createDevApp()
  .registerPlugin(workflowStatusPlugin)
  .addPage({
    element: <WorkflowStatusPage />,
    title: 'Root Page',
    path: '/workflow-status',
  })
  .render();
