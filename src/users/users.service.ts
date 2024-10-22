import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = []; // This will hold the user data in memory

  create(user: User) {
    this.users.push(user); // Add the user to the users array
    return user;
  }

  findByUsername(username: string) {
    return this.users.find(user => user.username === username); // Find user by username
  }

  authenticate(username: string, password: string) {
    const user = this.findByUsername(username); // Find user by username
    if (user && user.password === password) {
      return user; // Return user if credentials match
    }
    return null; // Return null if credentials do not match
  }

  findOne(userId: number): User | undefined {
    return this.users.find(user => user.id === userId); // Find user by ID
  }

  // Add this method to return all users
  findAll() {
    return this.users; // Return the array of users
  }
}
