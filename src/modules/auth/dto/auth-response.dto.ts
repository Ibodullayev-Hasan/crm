import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'encrypted_access_token' })
  accToken: string;

  @ApiProperty({ example: '10m' })
  accessExpiresIn: string;

  @ApiProperty({ example: 'encrypted_refresh_token' })
  refToken: string;

  @ApiProperty({ example: '7d' })
  refreshExpiresIn: string;
}
