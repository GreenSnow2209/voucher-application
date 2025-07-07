import { AuthController } from '../../../controllers/auth.controller';
import { Request, Response } from 'express';
import { RES_STATUS, RES_MESSAGE } from '../../../utils/const';

jest.mock('../../../services/user.service');

describe('AuthController - register', () => {
  let controller: AuthController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    controller = new AuthController();

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockReq = {
      body: {
        email: 'test@example.com',
        password: 'securePass',
        name: 'Test User',
      },
    };

    mockRes = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it('should return 201 and user if register is successful', async () => {
    const mockUser = { id: 'u001', email: 'test@example.com', name: 'Test User' };

    (controller['userService'].register as jest.Mock).mockResolvedValue(mockUser);

    await controller.register(mockReq as Request, mockRes as Response);

    expect(controller['userService'].register).toHaveBeenCalledWith('test@example.com', 'securePass', 'Test User');
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ user: mockUser });
  });

  it('should return 401 if register fails (user is null)', async () => {
    (controller['userService'].register as jest.Mock).mockResolvedValue(null);

    await controller.register(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(RES_STATUS.UNAUTHORIZED);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  it('should return 500 if register throws error', async () => {
    (controller['userService'].register as jest.Mock).mockRejectedValue(new Error('Database down'));

    const sendMock = jest.fn();
    (mockRes.status as jest.Mock).mockReturnValue({ send: sendMock });

    await controller.register(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(RES_STATUS.SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith({ message: RES_MESSAGE.INTERNAL_ERROR });
  });
});
