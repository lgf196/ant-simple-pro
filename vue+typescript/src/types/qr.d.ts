enum ErrorCorrentLevel {
  L = 1,
	M = 0,
	Q = 3,
	H = 2
}

// enum Mode {
//   MODE_NUMBER =	1 << 0,
// 	MODE_ALPHA_NUM = 1 << 1,
// 	MODE_8BIT_BYTE = 1 << 2,
// 	MODE_KANJI = 1 << 3
// }

declare class QR8bitByte {
  mode: number
  data: string
  constructor(data: string)

  getLength(): number

  write(buffer: QRBitBuffer): void
}

declare class QRBitBuffer {
  buffer: number[]
  length: number

  get(): boolean

  put(num: number, length: number): void

  getLengthInBits(): number

  putBit(bit: boolean): void
}

declare module 'qr.js/lib/QRCode' {
  export default class QRCode {
    typeNumber: number
    errorCorrectLevel: 0 | 1 | 2 | 3
    modules: boolean[][] | null
    moduleCount: number
    dataCache: any[] | null
    dataList: QR8bitByte[]
  
    constructor(typeNumber: number, errorCorrectLevel: 0 | 1 | 2 | 3)
  
    addData(data: string): void
  
    make(): void
  }
}

declare module 'qr.js/lib/ErrorCorrectLevel' {
  export default {
    L: number,
    M: number,
    Q: number,
    H: number
  }
}
