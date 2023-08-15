import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { ZegoTokenGeneratorOptions } from './zego-token-generator.types';

@Injectable()
export class ZegoTokenGeneratorService {
  ErrorCode: any;
  constructor() {
    this.setErrorCode(this.ErrorCode || (this.ErrorCode = {}));
  }

  setErrorCode(ErrorCode) {
    ErrorCode[(ErrorCode['success'] = 0)] = 'success';
    ErrorCode[(ErrorCode['appIDInvalid'] = 1)] = 'appIDInvalid';
    ErrorCode[(ErrorCode['userIDInvalid'] = 3)] = 'userIDInvalid';
    ErrorCode[(ErrorCode['secretInvalid'] = 5)] = 'secretInvalid';
    ErrorCode[(ErrorCode['effectiveTimeInSecondsInvalid'] = 6)] =
      'effectiveTimeInSecondsInvalid';
  }

  RndNum(a, b) {
    return Math.ceil((a + (b - a)) * Math.random());
  }

  makeRandomIv() {
    const str = '0123456789abcdefghijklmnopqrstuvwxyz';
    const result = [];
    for (let i = 0; i < 16; i++) {
      const r = Math.floor(Math.random() * str.length);
      result.push(str.charAt(r));
    }
    return result.join('');
  }

  getAlgorithm(keyBase64) {
    const key = Buffer.from(keyBase64);
    switch (key.length) {
      case 16:
        return 'aes-128-cbc';
      case 24:
        return 'aes-192-cbc';
      case 32:
        return 'aes-256-cbc';
    }
    throw new Error('Invalid key length: ' + key.length);
  }

  aesEncrypt(plainText, key, iv) {
    const cipher = crypto.createCipheriv(this.getAlgorithm(key), key, iv);
    cipher.setAutoPadding(true);
    const encrypted = cipher.update(plainText);
    const final = cipher.final();
    const out = Buffer.concat([encrypted, final]);
    return Uint8Array.from(out).buffer;
  }

  generateToken(zegoTokenGeneratorOptions: ZegoTokenGeneratorOptions) {
    const { appID, secretID, userID, effectiveTimeInSeconds, payload } =
      zegoTokenGeneratorOptions;

    const createTime = Math.floor(new Date().getTime() / 1000);
    const tokenInfo = {
      app_id: appID,
      user_id: userID,
      nonce: this.RndNum(-2147483648, 2147483647),
      ctime: createTime,
      expire: createTime + effectiveTimeInSeconds,
      payload: payload || '',
    };
    const plaintText = JSON.stringify(tokenInfo);
    const iv = this.makeRandomIv();
    const encryptBuf = this.aesEncrypt(plaintText, secretID, iv);
    const _a = [new Uint8Array(8), new Uint8Array(2), new Uint8Array(2)],
      b1 = _a[0],
      b2 = _a[1],
      b3 = _a[2];
    new DataView(b1.buffer).setBigInt64(0, BigInt(tokenInfo.expire), false);
    new DataView(b2.buffer).setUint16(0, iv.length, false);
    new DataView(b3.buffer).setUint16(0, encryptBuf.byteLength, false);
    const buf = Buffer.concat([
      Buffer.from(b1),
      Buffer.from(b2),
      Buffer.from(iv),
      Buffer.from(b3),
      Buffer.from(encryptBuf),
    ]);
    const dv = new DataView(Uint8Array.from(buf).buffer);
    return '04' + Buffer.from(dv.buffer).toString('base64');
  }
}
