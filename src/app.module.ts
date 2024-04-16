import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './users/auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './users/auth/auth.module';
import { Ingredient } from './ingredient/entities/ingredient.entity';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';
import { User } from './users/entities/user.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { Comment } from './comment/entities/comment.entity';
import { Like } from './like/entities/like.entity';
import { SelectionsModule } from './selections/selections.module';
import { Selection } from './selections/entities/selection.entity';
import { RecipeIngredientsModule } from './recipe_ingredients/recipe_ingredients.module';
import { RecipeIngredient } from './recipe_ingredients/entities/recipe_ingredient.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          Ingredient,
          Recipe,
          Comment,
          Like,
          Selection,
          RecipeIngredient,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    IngredientModule,
    RecipeModule,
    CommentModule,
    LikeModule,
    SelectionsModule,
    RecipeIngredientsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ConfigService,
  ],
})
export class AppModule {}
