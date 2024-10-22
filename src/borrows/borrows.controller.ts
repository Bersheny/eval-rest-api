import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { Borrow } from './entities/borrow.entity';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Controller('borrows')
export class BorrowsController {
  constructor(
    private readonly borrowsService: BorrowsService,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getAllBorrows() {
    return this.borrowsService.findAll(); // Call the service method to get all borrows
  }

  @Post()
  borrowBook(@Body() borrow: Borrow) {
    return this.borrowsService.borrowBook(borrow);
  }

  @Post('dto')
  async borrowBookWithDto(@Body() createBorrowDto: CreateBorrowDto) {
    const book = await this.booksService.findOne(createBorrowDto.bookId); // Retrieve the book
    const user = await this.usersService.findOne(createBorrowDto.userId); // Retrieve the user

    if (!book || !user) {
      return { message: 'Book or User not found' };
    }

    const borrow: Borrow = {
      id: Date.now(), // Generate a temporary ID
      book: book,
      user: user,
      borrowDate: createBorrowDto.borrowDate,
      returnDate: null,
    };

    return this.borrowsService.borrowBook(borrow);
  }

  @Post(':id/rate')
  rateBook(@Param('id') id: string, @Body() { userId, rating }: { userId: number, rating: number }) {
    return this.borrowsService.rateBook(userId, +id, rating);
  }
}