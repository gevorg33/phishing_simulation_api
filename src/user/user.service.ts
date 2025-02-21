import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

import { User, UserDocument } from './schemas/user.schema';
import { JWT_SECRET } from '../config';
import { UserResponseInterface } from './types/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * USER LOGIN
   */
  async login(loginUserDto: LoginUserDto): Promise<Partial<UserDocument>> {
    const user = await this.userModel
      .findOne({ email: loginUserDto.email })
      .select('+password')
      .exec();

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // Compare passwords
    const isPasswordCorrect = await compare(loginUserDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const userObj = user.toObject();
    const { password, ...result } = userObj;
    return result;
  }

  /**
   * UPDATE USER
   */
  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    // If userId is a number in your schema, adapt accordingly. By default, Mongoose IDs are strings.
    const user = await this.findById(userId);

    // Merge updates
    Object.assign(user, updateUserDto);

    // Save updated user
    const updatedUser = await user.save();
    return updatedUser.toObject();
  }

  /**
   * CREATE USER
   */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // Check for existing email
    const userByEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    // Check for existing username
    const userByUsername = await this.userModel.findOne({
      username: createUserDto.username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // Create and save new user
    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();

    return savedUser.toObject();
  }

  /**
   * FIND BY EMAIL
   */
  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user.toObject();
  }

  /**
   * FIND BY ID
   */
  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user; // Return the Mongoose Document here if you need to .save() it later
  }

  /**
   * BUILD USER RESPONSE
   */
  buildUserResponse(user): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  /**
   * GENERATE JWT
   */
  private generateJwt(user: UserDocument): string {
    return sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }
}
