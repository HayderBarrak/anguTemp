import {TokenStorageService} from './token-storage.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

export const services = [AuthService, UserService,TokenStorageService];

export * from './auth.service';
export * from './user.service';
export * from './token-storage.service';
