import { AuthController } from '../../../controllers/auth.controller';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RES_STATUS, RES_MESSAGE } from '../../../utils/const';

jest.mock('../../../services/user.service');
jest.mock('jsonwebtoken');

describe('AuthController - login', () => {
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
        password: 'secret',
      },
    };

    mockRes = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it('should return token if login is successful', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    const mockToken = 'jwt-token';

    (controller['userService'].validateLogin as jest.Mock).mockResolvedValue(mockUser);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    await controller.login(mockReq as Request, mockRes as Response);

    expect(controller['userService'].validateLogin).toHaveBeenCalledWith('test@example.com', 'secret');
    expect(jwt.sign).toHaveBeenCalledWith({ id: '123', email: 'test@example.com' }, expect.any(String), {
      expiresIn: '1h',
    });
    expect(jsonMock).toHaveBeenCalledWith({ token: mockToken });
  });

  it('should return 401 if login fails', async () => {
    (controller['userService'].validateLogin as jest.Mock).mockResolvedValue(null);

    await controller.login(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(RES_STATUS.UNAUTHORIZED);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  it('should return 500 on error', async () => {
    (controller['userService'].validateLogin as jest.Mock).mockRejectedValue(new Error('Unexpected'));

    const sendMock = jest.fn();
    (mockRes.status as jest.Mock).mockReturnValue({ send: sendMock });

    await controller.login(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(RES_STATUS.SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith({ message: RES_MESSAGE.INTERNAL_ERROR });
  });
});
