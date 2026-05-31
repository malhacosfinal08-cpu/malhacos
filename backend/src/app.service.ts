import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date(),
      version: '1.0.0',
    };
  }

  getInfo() {
    return {
      name: 'Rede Social Cristã - API',
      description: 'Conectando o Mundo com Jesus',
      version: '1.0.0',
      author: 'Malhacos',
      timestamp: new Date(),
    };
  }
}
