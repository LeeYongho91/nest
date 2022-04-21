import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { createBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  /**
   *
   * @param createBoardDto
   * @returns
   */
  async createBoard(createBoardDto: createBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  /**
   *
   * @param id
   */
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    console.log(`result ${result}`);
  }

  /**
   *
   * @param id
   * @param status
   * @returns
   */
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.save(board);

    return board;
  }

  /**
   *
   * @param id
   * @returns
   */
  async getBoardById(id): Promise<Board> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find board with ${id}`);
    }

    return found;
  }
}
