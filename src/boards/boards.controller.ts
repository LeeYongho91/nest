import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private BoardsService: BoardsService) {}

  /**
   *
   * @returns
   */
  @Get('/')
  getAllBoard(): Board[] {
    return this.BoardsService.getAllBoards();
  }

  /**
   *
   * @param createBoardDto
   * @returns
   */
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: createBoardDto): Board {
    return this.BoardsService.createBoard(createBoardDto);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.BoardsService.getBoardById(id);
  }

  /**
   *
   * @param id
   */
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.BoardsService.deleteBoard(id);
  }

  /**
   *
   * @param id
   * @param status
   * @returns
   */
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.BoardsService.updateBoardStatus(id, status);
  }
}
