# bytebuf

A byte buffer for encoding and decoding binary data in JavaScript. Supports the major web browsers, NodeJS, Deno, and Cloudflare Workers.

# Install

```sh
npm i bytebuf
```

# Usage

```js
import { ByteBuf } from "bytebuf"

const data = new Uint8Array(1024)
const buffer = ByteBuf.from(data)

buffer.writeInt32(16)
buffer.writeString("Encoding is fun!")
buffer.setInt16(4, 25924, true)
buffer.writeVarInt(49)

console.log(buffer.byteOffset) // 21
buffer.reset()

const byteLength = buffer.readInt32() // 16
console.log(buffer.readString(byteLength)) // "Decoding is fun!"
console.log(buffer.getVarInt(20)) // { value: 49, byteLength: 1 }
```
