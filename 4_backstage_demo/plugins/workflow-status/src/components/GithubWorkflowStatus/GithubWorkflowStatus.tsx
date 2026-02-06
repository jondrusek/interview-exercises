import { useEffect, useState } from 'react';

type Status = 'success' | 'failure' | 'in_progress' | 'queued' | 'unknown';

const GITHUB_OWNER = 'cyclops-k8s';
const GITHUB_REPO = 'ansible-kubernetes';
const WORKFLOW_FILE = 'cluster-install-tests.yml';

const statusColors: Record<Status, string> = {
    success: '#4caf50',
    failure: '#f44336',
    in_progress: '#2196f3',
    queued: '#ff9800',
    unknown: '#757575',
};

export const GithubWorkflowStatus = () => {
    const [status, setStatus] = useState<Status>('unknown');
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/runs?per_page=1`
        )
            .then(res => res.json())
            .then(data => {
                if (data.workflow_runs && data.workflow_runs.length > 0) {
                    setStatus(data.workflow_runs[0].conclusion || data.workflow_runs[0].status || 'unknown');
                    setUrl(data.workflow_runs[0].html_url);
                }
            });
    }, []);

    return (
        <div
            style={{
                maxWidth: 400,
                margin: '24px auto',
                padding: 24,
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                background: '#fff',
                fontFamily: 'sans-serif',
            }}
        >
            <h3 style={{ marginBottom: 16 }}>Latest Cluster Install Test Status</h3>
            <p style={{ fontSize: 18, margin: 0 }}>
                Status:{' '}
                <strong style={{ color: statusColors[status], textTransform: 'capitalize' }}>
                    {status.replace('_', ' ')}
                </strong>
                {url && (
                    <>
                        {' '}
                        [
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#1976d2', textDecoration: 'underline' }}
                        >
                            View on GitHub
                        </a>
                        ]
                    </>
                )}
            </p>
        </div>
    );
};
