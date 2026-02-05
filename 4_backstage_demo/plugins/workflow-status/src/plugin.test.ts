import { workflowStatusPlugin } from './plugin';

describe('workflow-status', () => {
  it('should export plugin', () => {
    expect(workflowStatusPlugin).toBeDefined();
  });
});
