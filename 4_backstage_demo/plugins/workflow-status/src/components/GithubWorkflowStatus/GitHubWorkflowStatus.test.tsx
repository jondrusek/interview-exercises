import { render, screen, waitFor } from '@testing-library/react';
import { GithubWorkflowStatus } from './GithubWorkflowStatus';

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    workflow_runs: [
                        {
                            conclusion: 'success',
                            html_url: 'https://github.com/cyclops-k8s/ansible-kubernetes/actions/runs/1',
                        },
                    ],
                }),
        } as any)
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('renders latest build status as success', async () => {
    render(<GithubWorkflowStatus />);
    await waitFor(() => {
        expect(screen.getByText(/Status:/)).toHaveTextContent('Status: success');
        expect(screen.getByRole('link', { name: /View on GitHub/ })).toHaveAttribute(
            'href',
            'https://github.com/cyclops-k8s/ansible-kubernetes/actions/runs/1'
        );
    });
});

test('renders unknown status if no workflow runs', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({ workflow_runs: [] }),
        } as any)
    );
    render(<GithubWorkflowStatus />);
    await waitFor(() => {
        expect(screen.getByText(/Status:/)).toHaveTextContent('Status: unknown');
    });
});

test('renders failure status', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    workflow_runs: [
                        {
                            conclusion: 'failure',
                            html_url: 'https://github.com/cyclops-k8s/ansible-kubernetes/actions/runs/2',
                        },
                    ],
                }),
        } as any)
    );
    render(<GithubWorkflowStatus />);
    await waitFor(() => {
        expect(screen.getByText(/Status:/)).toHaveTextContent('Status: failure');
        expect(screen.getByRole('link', { name: /View on GitHub/ })).toHaveAttribute(
            'href',
            'https://github.com/cyclops-k8s/ansible-kubernetes/actions/runs/2'
        );
    });
});
