import {
  mockCredentials,
  mockErrorHandler,
  mockServices,
} from '@backstage/backend-test-utils';
import express from 'express';
import request from 'supertest';

import { createRouter } from './router';
import { MusicLibraryService } from './services/TodoListService/types';

const mockSong = {
  title: 'My song',
  id: '123',
  createdBy: mockCredentials.user().principal.userEntityRef,
  createdAt: new Date().toISOString(),
};

// TEMPLATE NOTE:
// Testing the router directly allows you to write a unit test that mocks the provided options.
describe('createRouter', () => {
  let app: express.Express;
  let musicLibraryService: jest.Mocked<MusicLibraryService>;

  beforeEach(async () => {
    musicLibraryService = {
      addSongAsync: jest.fn(),
      listSongsAsync: jest.fn(),
      getSongByIdAsync: jest.fn(),
    };
    const router = await createRouter({
      httpAuth: mockServices.httpAuth(),
      musicLibraryService,
    });
    app = express();
    app.use(router);
    app.use(mockErrorHandler());
  });

  it('should create a song', async () => {
    musicLibraryService.addSongAsync.mockResolvedValue(mockSong);

    const response = await request(app).post('/songs').send({
      title: 'My song',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockSong);
  });

  it('should not allow unauthenticated requests to create a song', async () => {
    musicLibraryService.addSongAsync.mockResolvedValue(mockSong);

    // TEMPLATE NOTE:
    // The HttpAuth mock service considers all requests to be authenticated as a
    // mock user by default. In order to test other cases we need to explicitly
    // pass an authorization header with mock credentials.
    const response = await request(app)
      .post('/songs')
      .set('Authorization', mockCredentials.none.header())
      .send({
        title: 'My song',
      });

    expect(response.status).toBe(401);
  });
});
