import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';

export interface SongItem {
  title: string;
  id: string;
  createdBy: string;
  createdAt: string;
}

export interface MusicLibraryService {
  addSongAsync(
    input: {
      title: string;
      entityRef?: string;
    },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<SongItem>;

  listSongsAsync(): Promise<{ items: SongItem[] }>;

  getSongByIdAsync(request: { id: string }): Promise<SongItem>;
}
