import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpException,
  HttpStatus,
  HttpCode,
  Header,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

const mediaRootFolder = 'files/';

export const multerOptions = {
  limits: {
    fileSize: 500000000, // 500MB
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: mediaRootFolder,

    // File modification details
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

@Controller('file')
export class FileController {
  @Post('/')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadSingle(@UploadedFile() file) {
    return {
      success: true,
      ...file,
    };
  }
  @Post('bulk')
  @UseInterceptors(FilesInterceptor('files[]', 10, multerOptions))
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }

  @HttpCode(201)
  @Get(':imageUrl')
  @Header('Content-Type', 'image/png')
  getFile(@Param('imageUrl') imageUrl: string): StreamableFile {
    const file = createReadStream(mediaRootFolder + imageUrl);
    return new StreamableFile(file);
  }
}
