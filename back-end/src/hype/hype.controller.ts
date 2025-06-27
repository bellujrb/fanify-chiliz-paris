import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { HypeService } from './hype.service';

class HypeResponseDto {
  hypeA: number;
  hypeB: number;
  timeA: string;
  timeB: string;
}

class HypeSeriesItemDto {
  hypeA: number;
  hypeB: number;
  timestamp: number;
}

class HypeSeriesResponseDto {
  hypes: HypeSeriesItemDto[];
}

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

@ApiTags('Hype')
@Controller()
export class HypeController {
  constructor(private readonly hypeService: HypeService) {}

  // GET /hype/:hype-id
  @Get('hype/:hypeId')
  @ApiOperation({ summary: 'Buscar hype atual da blockchain' })
  @ApiParam({ name: 'hypeId', description: 'ID do hype' })
  @ApiResponse({ status: 200, type: HypeResponseDto })
  async getCurrentHype(@Param('hypeId') hypeId: string) {
    // TODO: implementar busca da blockchain
    return this.hypeService.getCurrentHype(hypeId);
  }

  // GET /hype/series/:hype-id
  @Get('hype/series/:hypeId')
  @ApiOperation({ summary: 'Buscar série temporal de hype do banco' })
  @ApiParam({ name: 'hypeId', description: 'ID do hype' })
  @ApiResponse({ status: 200, type: HypeSeriesResponseDto })
  async getHypeSeries(@Param('hypeId') hypeId: string) {
    // TODO: implementar busca do banco
    return this.hypeService.getHypeHistory(hypeId);
  }

  // GET /collect-posts/:hype-id
  @Get('collect-posts/:hypeId')
  @ApiOperation({ summary: 'Buscar posts do Twitter e análise de hype' })
  @ApiParam({ name: 'hypeId', description: 'ID do hype' })
  @ApiResponse({ status: 200, type: CollectPostsResponseDto })
  async collectPosts(@Param('hypeId') hypeId: string) {
    // TODO: implementar busca do twitter
    return this.hypeService.collectPosts(hypeId);
  }

  // POST /add-post/:hype-id
  @Post('add-post/:hypeId')
  @ApiOperation({ summary: 'Adicionar post manual e analisar sentimento' })
  @ApiParam({ name: 'hypeId', description: 'ID do hype' })
  @ApiBody({ type: AddPostInputDto })
  @ApiResponse({ status: 200, type: AddPostOutputDto })
  async addPost(@Param('hypeId') hypeId: string, @Body() body: AddPostInputDto) {
    // TODO: implementar análise de sentimento e atualização de hype
    return this.hypeService.addPost(hypeId, body.text);
  }
}
