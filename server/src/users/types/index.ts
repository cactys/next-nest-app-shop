import { ApiProperty } from '@nestjs/swagger';

export class SignupUserResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({
    example: '$2b$10$fL4Mq3pXQyqyjvascXfQaufaMyny4Ax2T5kXgTRXVqrGGlQC3GgIu',
  })
  password: string;

  @ApiProperty({ example: 'ivan@email.ru' })
  email: string;

  @ApiProperty({ example: '2023-12-04T14:12:10.895Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-12-04T14:12:10.895Z' })
  createdAt: string;
}

export class LoginUserRequest {
  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({ example: 'ivan123' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'Ivan',
        password: 'ivan123',
      },
    },
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Logged in' })
  message: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({ example: 'ivan@email.ru' })
  email: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'Session has ended' })
  message: string;
}
