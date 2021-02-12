import { ByteBuf } from "./bytebuf.mjs"

const tests = [
	{
		type: "Bool",
		getValue: function(buffer) {
			return buffer.getBool(0)
		},
		readValue: function(buffer) {
			return buffer.readBool()
		},
		setValue: function(buffer, entry) {
			return buffer.setBool(0, entry.value)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeBool(entry.value)
		},
		values: [
			{
				value: true,
				bytes: new Uint8Array([0x01])
			},
			{
				value: false,
				bytes: new Uint8Array([0x00])
			}
		]
	},
	{
		type: "Int8",
		getValue: function(buffer) {
			return buffer.getInt8(0)
		},
		readValue: function(buffer) {
			return buffer.readInt8()
		},
		setValue: function(buffer, entry) {
			return buffer.setInt8(0, entry.value)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeInt8(entry.value)
		},
		values: [
			{
				value: 0,
				bytes: new Uint8Array([0x00])
			},
			{
				value: -1,
				bytes: new Uint8Array([0xff])
			}
		]
	},
	{
		type: "Uint8",
		getValue: function(buffer) {
			return buffer.getUint8(0)
		},
		readValue: function(buffer) {
			return buffer.readUint8()
		},
		setValue: function(buffer, entry) {
			return buffer.setUint8(0, entry.value)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeUint8(entry.value)
		},
		values: [
			{
				value: 0,
				bytes: new Uint8Array([0x00])
			},
			{
				value: 255,
				bytes: new Uint8Array([0xff])
			}
		]
	},
	{
		type: "Int16",
		getValue: function(buffer, entry) {
			return buffer.getInt16(0, entry.littleEndian)
		},
		readValue: function(buffer, entry) {
			return buffer.readInt16(entry.littleEndian)
		},
		setValue: function(buffer, entry) {
			return buffer.setInt16(0, entry.value, entry.littleEndian)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeInt16(entry.value, entry.littleEndian)
		},
		values: [
			{
				value: 0,
				bytes: new Uint8Array([0x00, 0x00])
			},
			{
				value: -1,
				bytes: new Uint8Array([0xff, 0xff])
			},
			{
				value: 1501,
				littleEndian: true,
				bytes: new Uint8Array([0xdd, 0x05])
			},
			{
				value: -4608,
				littleEndian: true,
				bytes: new Uint8Array([0x00, 0xee])
			}
		]
	},
	{
		type: "Uint16",
		getValue: function(buffer, entry) {
			return buffer.getUint16(0, entry.littleEndian)
		},
		readValue: function(buffer, entry) {
			return buffer.readUint16(entry.littleEndian)
		},
		setValue: function(buffer, entry) {
			return buffer.setUint16(0, entry.value, entry.littleEndian)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeUint16(entry.value, entry.littleEndian)
		},
		values: [
			{
				value: 0,
				littleEndian: true,
				bytes: new Uint8Array([0x00, 0x00])
			},
			{
				value: 17408,
				littleEndian: true,
				bytes: new Uint8Array([0x00, 0x44])
			},
			{
				value: 863,
				bytes: new Uint8Array([0x03, 0x5f])
			},
			{
				value: 19852,
				bytes: new Uint8Array([0x4d, 0x8c])
			}
		]
	},
	{
		type: "Int32",
		getValue: function(buffer, entry) {
			return buffer.getInt32(0, entry.littleEndian)
		},
		readValue: function(buffer, entry) {
			return buffer.readInt32(entry.littleEndian)
		},
		setValue: function(buffer, entry) {
			return buffer.setInt32(0, entry.value, entry.littleEndian)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeInt32(entry.value, entry.littleEndian)
		},
		values: [
			{
				value: 0,
				bytes: new Uint8Array([0x00, 0x00, 0x00, 0x00])
			},
			{
				value: 13398,
				bytes: new Uint8Array([0x00, 0x00, 0x34, 0x56])
			},
			{
				value: 255,
				littleEndian: true,
				bytes: new Uint8Array([0xff, 0x00, 0x00, 0x00])
			},
			{
				value: -31199487,
				littleEndian: true,
				bytes: new Uint8Array([0x01, 0xef, 0x23, 0xfe])
			}
		]
	},
	{
		type: "Uint32",
		getValue: function(buffer, entry) {
			return buffer.getUint32(0, entry.littleEndian)
		},
		readValue: function(buffer, entry) {
			return buffer.readUint32(entry.littleEndian)
		},
		setValue: function(buffer, entry) {
			return buffer.setUint32(0, entry.value, entry.littleEndian)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeUint32(entry.value, entry.littleEndian)
		},
		values: [
			{
				value: 0,
				littleEndian: true,
				bytes: new Uint8Array([0x00, 0x00, 0x00, 0x00])
			},
			{
				value: 4278255871,
				littleEndian: true,
				bytes: new Uint8Array([0xff, 0x00, 0x01, 0xff])
			},
			{
				value: 838868224,
				bytes: new Uint8Array([0x32, 0x00, 0x1d, 0x00])
			},
			{
				value: 4294967295,
				bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff])
			}
		]
	},
	{
		type: "Int64",
		getValue: function(buffer, entry) {
			return buffer.getInt64(0, entry.littleEndian)
		},
		readValue: function(buffer, entry) {
			return buffer.readInt64(entry.littleEndian)
		},
		setValue: function(buffer, entry) {
			return buffer.setInt64(0, entry.value, entry.littleEndian)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeInt64(entry.value, entry.littleEndian)
		},
		values: [
			{
				value: 0,
				bytes: new Uint8Array([0x00, 0x00, 0x00, 0x00,
									   0x00, 0x00, 0x00, 0x00])
			},
			{
				value: -1,
				bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff,
									   0xff, 0xff, 0xff, 0xff])
			},
			{
				value: 9007199254740991,
				littleEndian: true,
				bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff,
									   0xff, 0xff, 0x1f, 0x00])
			},
			{
				value: -256,
				littleEndian: true,
				bytes: new Uint8Array([0x00, 0xff, 0xff, 0xff,
									   0xff, 0xff, 0xff, 0xff])
			}
		]
	},
	{
		type: "Uint64",
		getValue: function(buffer, entry) {
			return buffer.getUint64(0, entry.littleEndian)
		},
		readValue: function(buffer, entry) {
			return buffer.readUint64(entry.littleEndian)
		},
		setValue: function(buffer, entry) {
			return buffer.setUint64(0, entry.value, entry.littleEndian)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeUint64(entry.value, entry.littleEndian)
		},
		values: [
			{
				value: 0,
				littleEndian: true,
				bytes: new Uint8Array([0x00, 0x00, 0x00, 0x00,
									   0x00, 0x00, 0x00, 0x00])
			},
			{
				value: 65535,
				littleEndian: true,
				bytes: new Uint8Array([0xff, 0xff, 0x00, 0x00,
									   0x00, 0x00, 0x00, 0x00])
			},
			{
				value: 4294967296,
				bytes: new Uint8Array([0x00, 0x00, 0x00, 0x01,
									   0x00, 0x00, 0x00, 0x00])
			},
			{
				value: 9007199254740991,
				bytes: new Uint8Array([0x00, 0x1f, 0xff, 0xff,
									   0xff, 0xff, 0xff, 0xff])
			}
		]
	},
	{
		type: "Float32",
		getValue: function(buffer, entry) {
			return buffer.getFloat32(0, entry.littleEndian)
		},
		readValue: function(buffer, entry) {
			return buffer.readFloat32(entry.littleEndian)
		},
		setValue: function(buffer, entry) {
			return buffer.setFloat32(0, entry.value, entry.littleEndian)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeFloat32(entry.value, entry.littleEndian)
		},
		values: [
			{
				value: 0,
				bytes: new Uint8Array([0x00, 0x00, 0x00, 0x00])
			},
			{
				value: -1.7147039117384454e+38,
				bytes: new Uint8Array([0xff, 0x00, 0xff, 0xff])
			},
			{
				value: 2.3680999571924454e-38,
				littleEndian: true,
				bytes: new Uint8Array([0x7f, 0xee, 0x00, 0x01])
			},
			{
				value: 49478916636672,
				littleEndian: true,
				bytes: new Uint8Array([0xd5, 0x00, 0x34, 0x56])
			}
		]
	},
	{
		type: "Float64",
		getValue: function(buffer, entry) {
			return buffer.getFloat64(0, entry.littleEndian)
		},
		readValue: function(buffer, entry) {
			return buffer.readFloat64(entry.littleEndian)
		},
		setValue: function(buffer, entry) {
			return buffer.setFloat64(0, entry.value, entry.littleEndian)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeFloat64(entry.value, entry.littleEndian)
		},
		values: [
			{
				value: 0,
				littleEndian: true,
				bytes: new Uint8Array([0x00, 0x00, 0x00, 0x00,
									   0x00, 0x00, 0x00, 0x00])
			},
			{
				value: -1.0038006599012751e+92,
				littleEndian: true,
				bytes: new Uint8Array([0x24, 0x3f, 0x6a, 0x88,
									   0x85, 0xa3, 0x08, 0xd3])
			},
			{
				value: 3.186958684239239e-58,
				bytes: new Uint8Array([0x34, 0x00, 0x00, 0xff,
									   0x01, 0xfe, 0x00, 0x81])
			},
			{
				value: -5.486124072790359e+303,
				bytes: new Uint8Array([0xff, 0x00, 0x00, 0x00,
									   0x00, 0x32, 0x10, 0x00])
			}
		]
	},
	{
		type: "VarInt",
		getValue: function(buffer, entry) {
			const { value, byteLength } = buffer.getVarInt(0, entry.byteLength)
		
			console.assert(byteLength === entry.byteLength,
				{ type: "VarInt", expected: entry.byteLength,
				  actual: byteLength, value })

			return value
		},
		readValue: function(buffer, entry) {
			return buffer.readVarInt(entry.byteLength)
		},
		setValue: function(buffer, entry) {
			return buffer.setVarInt(0, entry.value, entry.byteLength)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeVarInt(entry.value, entry.byteLength)
		},
		values: [
			{
				value: 0,
				byteLength: 1,
				bytes: new Uint8Array([0x00])
			},
			{
				value: 127,
				byteLength: 1,
				bytes: new Uint8Array([0x7f])
			},
			{
				value: 255,
				byteLength: 2,
				bytes: new Uint8Array([0xff, 0x01])
			},
			{
				value: 2097151,
				byteLength: 3,
				bytes: new Uint8Array([0xff, 0xff, 0x7f])
			},
			{
				value: 2147483647,
				byteLength: 5,
				bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff, 0x07])
			},
			{
				value: -1,
				byteLength: 5,
				bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff, 0x0f])
			},
			{
				value: -2147483648,
				byteLength: 5,
				bytes: new Uint8Array([0x80, 0x80, 0x80, 0x80, 0x08])
			}
		]
	},
	{
		type: "VarUint",
		getValue: function(buffer, entry) {
			const { value, byteLength } = buffer.getVarUint(0, entry.byteLength)
		
			console.assert(byteLength === entry.byteLength,
				{ type: "VarUint", expected: entry.byteLength,
				  actual: byteLength, value })

			return value
		},
		readValue: function(buffer, entry) {
			return buffer.readVarUint(entry.byteLength)
		},
		setValue: function(buffer, entry) {
			return buffer.setVarUint(0, entry.value, entry.byteLength)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeVarUint(entry.value, entry.byteLength)
		},
		values: [
			{
				value: 0,
				byteLength: 1,
				bytes: new Uint8Array([0x00])
			},
			{
				value: 255,
				byteLength: 2,
				bytes: new Uint8Array([0xff, 0x01])
			},
			{
				value: 2147483647,
				byteLength: 5,
				bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff, 0x07])
			},
			{
				value: 4294967295,
				byteLength: 5,
				bytes: new Uint8Array([0xff, 0xff, 0xff, 0xff, 0x0f])
			}
		]
	},
	{
		type: "VarZint",
		getValue: function(buffer, entry) {
			const { value, byteLength } = buffer.getVarZint(0, entry.byteLength)
		
			console.assert(byteLength === entry.byteLength,
				{ type: "VarZint", expected: entry.byteLength,
				  actual: byteLength, value })

			return value
		},
		readValue: function(buffer, entry) {
			return buffer.readVarZint(entry.byteLength)
		},
		setValue: function(buffer, entry) {
			return buffer.setVarZint(0, entry.value, entry.byteLength)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeVarZint(entry.value, entry.byteLength)
		},
		values: [
			{
				value: 0,
				byteLength: 1,
				bytes: new Uint8Array([0x00])
			},
			{
				value: 255,
				byteLength: 2,
				bytes: new Uint8Array([0xfe, 0x03])
			},
			{
				value: -1,
				byteLength: 1,
				bytes: new Uint8Array([0x01])
			}
		]
	},
	{
		type: "Uint8Array",
		getValue: function(buffer, entry) {
			return buffer.getUint8Array(0, entry.byteLength)
		},
		readValue: function(buffer, entry) {
			return buffer.readUint8Array(entry.byteLength)
		},
		setValue: function(buffer, entry) {
			return buffer.setUint8Array(0, entry.value)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeUint8Array(entry.value)
		},
		values: [
			{
				value: new Uint8Array([]),
				bytes: new Uint8Array([])
			},
			{
				value: new Uint8Array([0xff]),
				bytes: new Uint8Array([0xff])
			},
			{
				value: new Uint8Array([0x00, 0x00, 0x00, 0xff]),
				bytes: new Uint8Array([0x00, 0x00, 0x00, 0xff])
			}
		]
	},
	{
		type: "Uint16Array",
		getValue: function(buffer, entry) {
			return buffer.getUint16Array(0, entry.byteLength)
		},
		readValue: function(buffer, entry) {
			return buffer.readUint16Array(entry.byteLength)
		},
		setValue: function(buffer, entry) {
			return buffer.setUint16Array(0, entry.value)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeUint16Array(entry.value)
		},
		values: [
			{
				value: new Uint16Array([]),
				bytes: new Uint8Array([])
			},
			{
				value: new Uint16Array([0xff]),
				bytes: new Uint8Array([0xff, 0x00])
			},
			{
				value: new Uint16Array([0x1234, 0x5678]),
				bytes: new Uint8Array([0x34, 0x12, 0x78, 0x56])
			}
		]
	},
	{
		type: "String",
		getValue: function(buffer, entry) {
			return buffer.getString(0, entry.byteLength, entry.byteEncoding)
		},
		readValue: function(buffer, entry) {
			return buffer.readString(entry.byteLength, entry.byteEncoding)
		},
		setValue: function(buffer, entry) {
			return buffer.setString(0, entry.value, entry.byteEncoding)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeString(entry.value, entry.byteEncoding)
		},
		values: [
			{
				value: "",
				byteEncoding: "utf-8",
				byteLength: 0,
				bytes: new Uint8Array(0)
			},
			{
				value: "Hello",
				byteEncoding: "utf-8",
				byteLength: 5,
				bytes: new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f])
			},
			{
				value: "𩸽",
				byteEncoding: undefined, // utf-8
				byteLength: 4,
				bytes: new Uint8Array([0xf0, 0xa9, 0xb8, 0xbd])
			}
			/*{
				value: "localhost",
				byteEncoding: "utf16-be",
				byteLength: 18,
				bytes: new Uint8Array([0x00, 0x6c, 0x00, 0x6f,
									   0x00, 0x63, 0x00, 0x61,
									   0x00, 0x6c, 0x00, 0x68,
									   0x00, 0x6f, 0x00, 0x73,
									   0x00, 0x74])
			},
			{
				value: "π",
				byteEncoding: "utf16-le",
				byteLength: 2,
				bytes: new Uint8Array([0xc0, 0x03])
			}*/
		]
	},
	{
		type: "VarString",
		getValue: function(buffer, entry) {
			const { value, byteLength } = buffer.getVarString(0, entry.byteLength)

			console.assert(byteLength === entry.byteLength,
				{ type: "VarString", expected: entry.byteLength,
				  actual: byteLength, value })

			return value
		},
		readValue: function(buffer, entry) {
			return buffer.readVarString(entry.byteLength)
		},
		setValue: function(buffer, entry) {
			return buffer.setVarString(0, entry.value)
		},
		writeValue: function(buffer, entry) {
			return buffer.writeVarString(entry.value)
		},
		values: [
			{
				value: "",
				byteLength: 1,
				bytes: new Uint8Array([0x00])
			},
			{
				value: "Hello",
				byteLength: 6,
				bytes: new Uint8Array([0x05, 0x48, 0x65, 0x6c, 0x6c, 0x6f])
			},
			{
				value: "𩸽",
				byteLength: 5,
				bytes: new Uint8Array([0x04, 0xf0, 0xa9, 0xb8, 0xbd])
			}
		]
	}
]

function equals(a, b) {
	if (a === b) return true
	if (!ArrayBuffer.isView(a) || !ArrayBuffer.isView(b)) return false
	if (a.byteLength !== b.byteLength) return false
	return a.every((val, i) => val === b[i])
}

function testType(test) {
	const { type, values, getValue, readValue, setValue, writeValue } = test

	for (const entry of values) {
		const { value, bytes, byteLength } = entry
		const buffer = ByteBuf.from(bytes.slice())

		const decoded = getValue(buffer, entry)
		console.assert(equals(value, decoded),
			{ method: `get${type}`, expected: value, actual: decoded, bytes })

		if (!equals(decoded, readValue(buffer, entry))) {
			console.warn(`read${type} return value does not match get${type}`)
		}

		if (buffer.byteOffset !== buffer.byteLength) {
			console.warn(`read${type} byte offset does not match ${buffer.byteLength}`)
		}

		buffer.reset()
		if ('crypto' in globalThis) {
			crypto.getRandomValues(buffer)
		} else {
			new Uint8Array(buffer.buffer)
				.set(new Uint8Array(buffer.byteLength))
		}

		const encodedLength = setValue(buffer, entry)
		console.assert(byteLength === encodedLength,
			{ method: `set${type} (length)`,
			  expected: byteLength, actual: encodedLength, bytes })

		const encoded = new Uint8Array(buffer.buffer)
		console.assert(equals(bytes, encoded),
			{ method: `set${type}`, expected: bytes, actual: encoded, value })

		writeValue(buffer, entry)

		if (!equals(bytes, encoded)) {
			console.warn(`write${type} encoding not match set${type}`)
		}

		if (buffer.byteOffset !== buffer.byteLength) {
			console.warn(`write${type} byte offset does not match ${buffer.byteLength}`)
		}
	}
}

function testAll() {
	for (const test of tests) {
		testType(test)
	}
}

testAll()
