import { useEffect, useState } from 'react';

type Status = 'success' | 'failure' | 'in_progress' | 'queued' | 'unknown';

const GITHUB_OWNER = 'cyclops-k8s';
const GITHUB_REPO = 'ansible-kubernetes';
const WORKFLOW_FILE = 'cluster-install-tests.yml';

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
      <div>
        <h3>Latest Build Status</h3>
        <p>
          Status: <strong>{status}</strong>
          {url && (
              <>
                {' '}
                [<a href={url} target="_blank" rel="noopener noreferrer">View on GitHub</a>]
              </>
          )}
        </p>
      </div>
  );
};