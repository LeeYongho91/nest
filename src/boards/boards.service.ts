import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  /**
   *
   * @param createBoardDto
   * @returns
   */
  async createBoard(createBoardDto: createBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  /**
   *
   * @param id
   * @returns
   */
  async getBoardById(id): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find board with ${id}`);
    }

    return found;
  }

  /**
   *
   * @param id
   * @returns
   */
  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  /**
   *
   * @param id
   * @param status
   * @returns
   */
  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  /**
   *
   * @returns
   */
  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
}
