import { SetMetadata } from '@nestjs/common';

export const Roles = (key: string, roles: string | string[]) => SetMetadata(key, roles);
