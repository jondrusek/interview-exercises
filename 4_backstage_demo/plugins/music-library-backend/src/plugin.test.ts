import {
  mockCredentials,
  startTestBackend,
} from '@backstage/backend-test-utils';
import { musicLibraryPlugin } from './plugin';
import request from 'supertest';
import { catalogServiceMock } from '@backstage/plugin-catalog-node/testUtils';

// TEMPLATE NOTE:
// Plugin tests are integration tests for your plugin, ensuring that all pieces
// work together end-to-end. You can still mock injected backend services
// however, just like anyone who installs your plugin might replace the
// services with their own implementations.
describe('plugin', () => {
  it('should create and read songs', async () => {
    const { server } = await startTestBackend({
      features: [musicLibraryPlugin],
    });

    await request(server).get('/api/music-library/songs').expect(200, {
      items: [],
    });

    const createRes = await request(server)
      .post('/api/music-library/songs')
      .send({ title: 'My Song' });

    expect(createRes.status).toBe(201);
    expect(createRes.body).toEqual({
      id: expect.any(String),
      title: 'My Song',
      createdBy: mockCredentials.user().principal.userEntityRef,
      createdAt: expect.any(String),
    });

    const createdSong = createRes.body;

    await request(server)
      .get('/api/music-library/songs')
      .expect(200, {
        items: [createdSong],
      });

    await request(server)
      .get(`/api/music-library/songs/${createdSong.id}`)
      .expect(200, createdSong);
  });

  it('should create TODO item with catalog information', async () => {
    const { server } = await startTestBackend({
      features: [
        musicLibraryPlugin,
        catalogServiceMock.factory({
          entities: [
            {
              apiVersion: 'backstage.io/v1alpha1',
              kind: 'Component',
              metadata: {
                name: 'my-component',
                namespace: 'default',
                title: 'My Component',
              },
              spec: {
                type: 'service',
                owner: 'me',
              },
            },
          ],
        }),
      ],
    });

    const createRes = await request(server)
      .post('/api/music-library/songs')
      .send({ title: 'My Todo', entityRef: 'component:default/my-component' });

    expect(createRes.status).toBe(201);
    expect(createRes.body).toEqual({
      id: expect.any(String),
      title: '[My Component] My Todo',
      createdBy: mockCredentials.user().principal.userEntityRef,
      createdAt: expect.any(String),
    });
  });
});
