import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './storage';
import { FileSizeValidationPipe } from './file-size-validation-pipe.pipe';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //单文件上传 上传后验证
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile(
    @UploadedFile(
      // FileSizeValidationPipe,
      new ParseFilePipe({
        exceptionFactory: (err) => {
          throw new HttpException('xxx' + err, 500);
        },
        validators: [
          new MaxFileSizeValidator({ maxSize: 20 * 1024 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log(file, 'file');
    console.log(body, 'body');
  }

  //多文件上传 上传时验证
  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('bbb', 3, {
      storage: storage,
      limits: {
        fileSize: 100 * 1024,
      },
      fileFilter: (req, file, cb) => {
        console.log(file);
        cb(null, true);
      },
    }),
  )
  // 上传后验证
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log(files, 'files');
    console.log(body, 'body');
  }

  @Post('postFn')
  postFn(@Body() body) {
    console.log(body, 'body');
    return this.appService.getHello();
  }

  //分片上传
  @Post('largeFileUpload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      dest: 'uploads',
    }),
  )
  uploadLargeFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { name: string },
  ) {
    const fileName = body.name.match(/(.+)\-\d+$/)[1];

    const chunkDir = 'uploads/chunks_' + fileName;
    //在 uploads 下创建 chunks_文件名 的目录，把文件复制过去，然后删掉原始文件。
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    fs.rmSync(files[0].path);
  }
  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;
    const files = fs.readdirSync(chunkDir);
    let count = 0;
    let startPos = 0;
    //文件排序，不然会出现错乱或打不开
    files.sort((a: string, b: string) => {
      const indexA = parseInt(a.split('-').pop());
      const indexB = parseInt(b.split('-').pop());
      return indexA - indexB;
    });
    files.forEach((file) => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      stream
        .pipe(
          fs.createWriteStream('uploads/' + name, {
            start: startPos,
          }),
        )
        .on('finish', () => {
          //删除分片的文件
          count++;
          if (count === files.length) {
            fs.rm(
              chunkDir,
              {
                recursive: true,
              },
              () => {},
            );
          }
        });
      startPos += fs.statSync(filePath).size;
    });
  }
}
