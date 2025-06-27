import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { HypeService } from './hype.service';

class HypeResponseDto {
  /** Hype percentual do time A */
  hypeA: number;
  /** Hype percentual do time B */
  hypeB: number;
  /** Nome do time A */
  timeA: string;
  /** Nome do time B */
  timeB: string;
}

class HypeSeriesItemDto {
  /** Hype percentual do time A */
  hypeA: number;
  /** Hype percentual do time B */
  hypeB: number;
  /** Timestamp unix (segundos) */
  timestamp: number;
}

@ApiTags('Hype')
@ApiExtraModels(HypeResponseDto, HypeSeriesItemDto)
@Controller()
export class HypeController {
  constructor(private readonly hypeService: HypeService) {}

  /**
   * Buscar hype atual
   *
   * Retorna o hype atual de cada time para o confronto informado.
   *
   * Exemplo de resposta:
   * {
   *   "hypeA": 80.12,
   *   "hypeB": 20.82,
   *   "timeA": "PSG",
   *   "timeB": "BOT"
   * }
   */
  @Get('hype/:hypeId')
  @ApiOperation({ summary: 'Buscar hype atual', description: 'Retorna o hype atual de cada time para o confronto informado.' })
  @ApiParam({ name: 'hypeId', description: 'ID do hype (bytes4 ou string)' })
  @ApiResponse({ status: 200, description: 'Hype atual', type: HypeResponseDto, schema: { example: { hypeA: 80.12, hypeB: 20.82, timeA: 'PSG', timeB: 'BOT' } } })
  async getCurrentHype(@Param('hypeId') hypeId: string) {
    // TODO: implementar busca da blockchain
    return this.hypeService.getCurrentHype(hypeId);
  }

  /**
   * Buscar série temporal de hype
   *
   * Retorna a série temporal de hype para o confronto informado.
   *
   * Exemplo de resposta:
   * [
   *   { "hypeA": 80.12, "hypeB": 20.82, "timestamp": 1723213003 },
   *   ...
   * ]
   */
  @Get('hype/series/:hypeId')
  @ApiOperation({ summary: 'Buscar série temporal de hype', description: 'Retorna a série temporal de hype para o confronto informado.' })
  @ApiParam({ name: 'hypeId', description: 'ID do hype (bytes4 ou string)' })
  @ApiResponse({ status: 200, description: 'Série temporal de hype', schema: { type: 'array', items: { $ref: getSchemaPath(HypeSeriesItemDto) }, example: [ { hypeA: 80.12, hypeB: 20.82, timestamp: 1723213003 } ] } })
  async getHypeSeries(@Param('hypeId') hypeId: string) {
    // TODO: implementar busca do banco
    return this.hypeService.getHypeHistory(hypeId);
  }
}
