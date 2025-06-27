import { ApiProperty } from '@nestjs/swagger';

export class AddMockTweetDto {
  @ApiProperty({ example: '1234567890', description: 'ID do tweet' })
  id: string;

  @ApiProperty({ example: 'Este é um tweet de teste', description: 'Texto do tweet' })
  text: string;

  @ApiProperty({ example: '2024-06-27T03:45:00.000Z', description: 'Data de criação do tweet' })
  created_at: string;
} 