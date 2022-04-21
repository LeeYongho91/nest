import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  /**
   *
   * @param createBoardDto
   * @returns
   */
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: createBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
