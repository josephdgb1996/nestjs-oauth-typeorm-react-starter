import { Connection, Repository } from 'typeorm';
import { createMockDatabase } from '../utils/mockDatabase';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

describe('User Service', () => {
  let db: Connection;
  let userService: UsersService;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    db = await createMockDatabase([UserEntity]);
    userRepository = await db.getRepository(UserEntity);
    userService = new UsersService(userRepository);
  });
  afterAll(() => db.close());

  it('should create a new user', async () => {
    const mockUser = {
      id: 1,
      username: 'Anonymous',
      provider: 'test',
      providerId: 'test',
    };

    const newUser = await userService.findOrCreate(
      mockUser.provider,
      mockUser.providerId
    );
    expect(newUser).toMatchObject(mockUser);
  });

  it('should create a new user with a specified username', async () => {
    const mockUser = {
      id: 2,
      username: 'mockUser',
      provider: 'test2',
      providerId: 'test2',
    };

    const newUser = await userService.findOrCreate(
      mockUser.provider,
      mockUser.providerId,
      mockUser.username
    );
    expect(newUser).toMatchObject(mockUser);
  });
});
