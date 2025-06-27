import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TwitterService } from './twitter.service';
import { AddMockTweetDto } from './twitter.dto';
import { HypeService } from '../hype.service';

class CollectPostsResponseDto {
  new: number;
  total: number;
  hashtag: string;
  timeA: { posts: number; hype: number; name: string };
  timeB: { posts: number; hype: number; name: string };
}

class AddPostInputDto {
  text: string;
}

class AddPostOutputDto {
  timeA: number;
  timeB: number;
}

@ApiTags('Twitter')
@Controller('twitter')
export class TwitterController {
  constructor(
    private readonly twitterService: TwitterService,
    private readonly hypeService: HypeService,
  ) {}

  @Get('tweets')
  @ApiOperation({ summary: 'Listar todos os tweets salvos', description: 'Retorna todos os tweets salvos no banco de dados.' })
  @ApiResponse({ status: 200, description: 'Lista de tweets', type: AddMockTweetDto, isArray: true, schema: { example: [ { id: '1234567890', text: 'Este é um tweet de teste', created_at: '2024-06-27T03:45:00.000Z' } ] } })
  async getAllTweets() {
    return this.twitterService.getAllTweets();
  }

  /**
   * Buscar posts do Twitter e análise de hype
   * GET /twitter/analyze/:hypeId
   */
  @Get('analyze/:hypeId')
  @ApiOperation({ summary: 'Buscar posts do Twitter e análise de hype', description: 'Retorna dados de posts coletados e análise de hype para o confronto informado.' })
  @ApiParam({ name: 'hypeId', description: 'ID do hype (bytes4 ou string)' })
  @ApiResponse({ status: 200, description: 'Dados de posts e análise de hype', type: CollectPostsResponseDto, schema: { example: { new: 123, total: 1298, hashtag: '#xyz_123', timeA: { posts: 400, hype: 30.81, name: 'PSG' }, timeB: { posts: 898, hype: 69.19, name: 'BOT' } } } })
  async analyzeHype(@Param('hypeId') hypeId: string) {
    return this.hypeService.collectPosts(hypeId);
  }

  /**
   * Adicionar post manual e analisar sentimento
   * POST /twitter/manual-post/:hypeId
   */
  @Post('manual-post/:hypeId')
  @ApiOperation({ summary: 'Adicionar post manual e analisar sentimento', description: 'Adiciona um post manual para o confronto informado e retorna a análise de sentimento.' })
  @ApiParam({ name: 'hypeId', description: 'ID do hype (bytes4 ou string)' })
  @ApiBody({ type: AddPostInputDto, examples: { exemplo: { value: { text: 'meu texto a favor do PSG' } } } })
  @ApiResponse({ status: 200, description: 'Resultado da análise de sentimento', type: AddPostOutputDto, schema: { example: { timeA: 0.90, timeB: 0.10 } } })
  async manualPost(@Param('hypeId') hypeId: string, @Body() body: AddPostInputDto) {
    return this.hypeService.addPost(hypeId, body.text);
  }
} 