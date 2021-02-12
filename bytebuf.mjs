/**
 * A byte buffer.
 *
 * Supports the following data types: 
 * - Bool
 * - Int (8, 16, 32, 64)
 * - Uint (8, 16, 32, 64)
 * - BigInt (64)
 * - VarInt (unsigned, signed, and zigzag)
 * - String (utf8, utf16, and delimited)
 * - TypedArray
 * 
 * @extends DataView
 */
export class ByteBuf extends DataView {

    /**
     * Creates a byte buffer.
     * @param {BufferSource} source The data source.
     * @param {number} [byteOffset] The byte offset.
     * @param {number} [byteLength] The byte length.
     * @returns {ByteBuf} A byte buffer.
     */
    static from(source, byteOffset, byteLength) {
        const buffer = source instanceof ArrayBuffer ? source : source.buffer

        if (ArrayBuffer.isView(source)) {
            byteOffset = source.byteOffset + (byteOffset || 0)
        }

        return byteLength === undefined
            ? new ByteBuf(buffer, byteOffset)
            : new ByteBuf(buffer, byteOffset, Math.min(source.byteLength, byteLength))
    }

    /**
     * The byte offset.
     */
    byteOffset = super.byteOffset

    /**
     * Gets the number of remaining bytes.
     * @returns {number} The number of bytes remaining.
     */
    remaining() {
        return this.byteLength - this.byteOffset
    }

    /**
     * Skips the byte offset.
     * @param {number} byteLength The byte length.
     */
    skip(byteLength) {
        this.byteOffset += byteLength
    }

    /**
     * Resets the byte offset.
     */
    reset() {
        this.byteOffset = super.byteOffset
    }

    /**
     * Gets a boolean.
     * @param {number} byteOffset The byte offset.
     */
    getBool(byteOffset) {
        return this.getInt8(byteOffset) !== 0
    }

    /**
     * Reads the next boolean.
     */
    readBool() {
        return this.getInt8(this.byteOffset++) !== 0
    }

    /**
     * Sets a boolean.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} value The value.
     */
    setBool(byteOffset, value) {
        super.setInt8(byteOffset, value ? 1 : 0)
    }

    /**
     * Writes the next boolean.
     * @param {boolean} value The value.
     */
    writeBool(value) {
        this.setInt8(this.byteOffset++, value ? 1 : 0)
    }

    /**
     * Gets an signed byte.
     * @param {number} byteOffset The byte offset.
     * @returns {number} The value.
     */
    getInt8(byteOffset) {
        return super.getInt8(byteOffset)
    }

    /**
     * Reads the next signed byte.
     * @returns {number} The value.
     */
    readInt8() {
        return this.getInt8(this.byteOffset++)
    }

    /**
     * Sets a signed byte.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     */
    setInt8(byteOffset, value) {
        super.setInt8(byteOffset, value)
    }

    /**
     * Writes the next signed byte.
     * @param {number} value The value.
     */
    writeInt8(value) {
        this.setInt8(this.byteOffset++, value)
    }

    /**
     * Gets an unsigned byte.
     * @param {number} byteOffset The byte offset.
     * @returns {number} The value.
     */
    getUint8(byteOffset) {
        return super.getUint8(byteOffset)
    }

    /**
     * Reads the next unsigned byte.
     * @returns {number} The value.
     */
    readUint8() {
        return this.getUint8(this.byteOffset++)
    }

    /**
     * Sets an unsigned byte.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     */
    setUint8(byteOffset, value) {
        super.setUint8(byteOffset, value)
    }

    /**
     * Writes the next signed byte.
     * @param {number} value The value.
     */
    writeUint8(value) {
        this.setUint8(this.byteOffset++, value)
    }

    /**
     * Gets an signed short.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    getInt16(byteOffset, littleEndian) {
        return super.getInt16(byteOffset, littleEndian)
    }

    /**
     * Reads the next signed short.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    readInt16(littleEndian) {
        const value = this.getInt16(this.byteOffset, littleEndian)
        this.byteOffset += 2
        return value
    }

    /**
     * Sets a signed short.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    setInt16(byteOffset, value, littleEndian) {
        super.setInt16(byteOffset, value, littleEndian)
    }

    /**
     * Writes the next signed short.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    writeInt16(value, littleEndian) {
        this.setInt16(this.byteOffset, value, littleEndian)
        this.byteOffset += 2
    }

    /**
     * Gets an unsigned short.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    getUint16(byteOffset, littleEndian) {
        return super.getUint16(byteOffset, littleEndian)
    }

    /**
     * Reads the next unsigned short.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    readUint16(littleEndian) {
        const value = this.getUint16(this.byteOffset, littleEndian)
        this.byteOffset += 2
        return value
    }

    /**
     * Sets an unsigned short.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian.
     */
    setUint16(byteOffset, value, littleEndian) {
        super.setUint16(byteOffset, value, littleEndian)
    }

    /**
     * Writes the next signed short.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian.
     */
    writeUint16(value, littleEndian) {
        this.setUint16(this.byteOffset, value, littleEndian)
        this.byteOffset += 2
    }

    /**
     * Gets an signed integer.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    getInt32(byteOffset, littleEndian) {
        return super.getInt32(byteOffset, littleEndian)
    }

    /**
     * Reads the next signed integer.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    readInt32(littleEndian) {
        const value = this.getInt32(this.byteOffset, littleEndian)
        this.byteOffset += 4
        return value
    }

    /**
     * Sets a signed integer.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    setInt32(byteOffset, value, littleEndian) {
        super.setInt32(byteOffset, value, littleEndian)
    }

    /**
     * Writes the next signed integer.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    writeInt32(value, littleEndian) {
        this.setInt32(this.byteOffset, value, littleEndian)
        this.byteOffset += 4
    }

    /**
     * Gets an unsigned integer.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    getUint32(byteOffset, littleEndian) {
        return super.getUint32(byteOffset, littleEndian)
    }

    /**
     * Reads the next unsigned integer.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    readUint32(littleEndian) {
        const value = this.getUint32(this.byteOffset, littleEndian)
        this.byteOffset += 4
        return value
    }

    /**
     * Sets an unsigned integer.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian.
     */
    setUint32(byteOffset, value, littleEndian) {
        super.setUint32(byteOffset, value, littleEndian)
    }

    /**
     * Writes the next signed integer.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian.
     */
    writeUint32(value, littleEndian) {
        this.setUint32(this.byteOffset, value, littleEndian)
        this.byteOffset += 4
    }

    /**
     * Gets a float.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    getFloat32(byteOffset, littleEndian) {
        return super.getFloat32(byteOffset, littleEndian)
    }

    /**
     * Reads the next float.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    readFloat32(littleEndian) {
        const value = this.getFloat32(this.byteOffset, littleEndian)
        this.byteOffset += 4
        return value
    }

    /**
     * Sets a float.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    setFloat32(byteOffset, value, littleEndian) {
        super.setFloat32(byteOffset, value, littleEndian)
    }

    /**
     * Writes the next float.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    writeFloat32(value, littleEndian) {
        this.setFloat32(this.byteOffset, value, littleEndian)
        this.byteOffset += 4
    }

    /**
     * Gets a double.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    getFloat64(byteOffset, littleEndian) {
        return super.getFloat64(byteOffset, littleEndian)
    }

    /**
     * Reads the next double.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    readFloat64(littleEndian) {
        const value = this.getFloat64(this.byteOffset, littleEndian)
        this.byteOffset += 8
        return value
    }

    /**
     * Sets a double.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    setFloat64(byteOffset, value, littleEndian) {
        super.setFloat64(byteOffset, value, littleEndian)
    }

    /**
     * Writes the next double.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    writeFloat64(value, littleEndian) {
        this.setFloat64(this.byteOffset, value, littleEndian)
        this.byteOffset += 8
    }

    /**
     * Gets an signed long.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {bigint} The value.
     */
    getBigInt64(byteOffset, littleEndian) {
        return super.getBigInt64(byteOffset, littleEndian)
    }

    /**
     * Reads the next signed long.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {bigint} The value.
     */
    readBigInt64(littleEndian) {
        const value = this.getBigInt64(this.byteOffset, littleEndian)
        this.byteOffset += 8
        return value
    }

    /**
     * Sets a signed long.
     * @param {number} byteOffset The byte offset.
     * @param {bigint} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    setBigInt64(byteOffset, value, littleEndian) {
        super.setBigInt64(byteOffset, value, littleEndian)
    }

    /**
     * Writes the next signed long.
     * @param {bigint} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    writeBigInt64(value, littleEndian) {
        this.setBigInt64(this.byteOffset, value, littleEndian)
        this.byteOffset += 8
    }

    /**
     * Gets an unsigned long.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {bigint} The value.
     */
    getBigUint64(byteOffset, littleEndian) {
        return super.getBigUint64(byteOffset, littleEndian)
    }

    /**
     * Reads the next unsigned long.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {bigint} The value.
     */
    readBigUint64(littleEndian) {
        const value = this.getBigUint64(this.byteOffset, littleEndian)
        this.byteOffset += 8
        return value
    }

    /**
     * Sets an unsigned long.
     * @param {number} byteOffset The byte offset.
     * @param {bigint} value The value.
     * @param {boolean} [littleEndian] If the value is little endian.
     */
    setBigUint64(byteOffset, value, littleEndian) {
        super.setBigUint64(byteOffset, value, littleEndian)
    }

    /**
     * Writes the next unsigned long.
     * @param {bigint} value The value.
     * @param {boolean} [littleEndian] If the value is little endian.
     */
    writeBigUint64(value, littleEndian) {
        this.setBigUint64(this.byteOffset, value, littleEndian)
        this.byteOffset += 8
    }

    /**
     * Gets an signed long.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    getInt64(byteOffset, littleEndian) {
        return Number(this.getBigInt64(byteOffset, littleEndian))
    }

    /**
     * Reads the next signed long.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    readInt64(littleEndian) {
        const value = this.getInt64(this.byteOffset, littleEndian)
        this.byteOffset += 8
        return value
    }

    /**
     * Sets a signed long.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    setInt64(byteOffset, value, littleEndian) {
        this.setBigInt64(byteOffset, BigInt(value), littleEndian)
    }

    /**
     * Writes the next signed long.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian. 
     */
    writeInt64(value, littleEndian) {
        this.setInt64(this.byteOffset, value, littleEndian)
        this.byteOffset += 8
    }

    /**
     * Gets an unsigned long.
     * @param {number} byteOffset The byte offset.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    getUint64(byteOffset, littleEndian) {
        return Number(this.getBigUint64(byteOffset, littleEndian))
    }

    /**
     * Reads the next unsigned long.
     * @param {boolean} [littleEndian] If the value is little endian.
     * @returns {number} The value.
     */
    readUint64(littleEndian) {
        const value = this.getUint64(this.byteOffset, littleEndian)
        this.byteOffset += 8
        return value
    }

    /**
     * Sets an unsigned long.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian.
     */
    setUint64(byteOffset, value, littleEndian) {
        this.setBigUint64(byteOffset, BigInt(value), littleEndian)
    }

    /**
     * Writes the next signed long.
     * @param {number} value The value.
     * @param {boolean} [littleEndian] If the value is little endian.
     */
    writeUint64(value, littleEndian) {
        this.setUint64(this.byteOffset, value, littleEndian)
        this.byteOffset += 8
    }

    /**
     * @typedef {Object} IntResult
     * @property {number} value The value.
     * @property {number} byteLength The byte length.
     */

    /**
     * Gets a signed, variable-length integer.
     * @param {number} byteOffset The byte offset.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {IntResult} The result.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    getVarInt(byteOffset, maxByteLength = 10) {
        let value = 0
        let byteLength = 0
        for (let bitShift = 0; byteLength < maxByteLength; bitShift += 7) {
            const byte = this.getUint8(byteOffset + byteLength++)
            value |= (byte & 0b0111_1111) << bitShift
            if ((byte & 0b1000_0000) === 0) {
                return { value, byteLength }
            }
        }
        throw new RangeError("VarInt must be between 1 and " + maxByteLength + " bytes.")
    }

    /**
     * Reads the next signed, variable-length integer.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {number} The value.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    readVarInt(maxByteLength) {
        const { value, byteLength } = this.getVarInt(this.byteOffset, maxByteLength)
        this.byteOffset += byteLength
        return value
    }

    /**
     * Sets a signed, variable-length integer.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {number} The byte length.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    setVarInt(byteOffset, value, maxByteLength = 10) {
        for (let byteLength = 1; byteLength <= maxByteLength; byteLength++) {
            let byte = value & 0b0111_1111
            value >>>= 7
            if (value !== 0) {
                byte |= 0b1000_0000
            }
            this.setUint8(byteOffset++, byte)
            if (value === 0) {
                return byteLength
            }
        }
        throw new RangeError("VarInt must be between 1 and " + maxByteLength + " bytes.")
    }

    /**
     * Writes the next signed, variable-length integer.
     * @param {number} value The value.
     * @param {number} [maxByteLength] The maximum byte length.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    writeVarInt(value, maxByteLength) {
        const byteLength = this.setVarInt(this.byteOffset, value, maxByteLength)
        this.byteOffset += byteLength
    }

    /**
     * Gets an unsigned, variable-length integer.
     * @param {number} byteOffset The byte offset.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {IntResult} The result.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    getVarUint(byteOffset, maxByteLength) {
        const { value, byteLength } = this.getVarInt(byteOffset, maxByteLength)
        return { value: value >>> 0, byteLength }
    }

    /**
     * Reads the next unsigned, variable-length integer.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {number} The value.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    readVarUint(maxByteLength) {
        const { value, byteLength } = this.getVarUint(this.byteOffset, maxByteLength)
        this.byteOffset += byteLength
        return value
    }

    /**
     * Sets an unsigned, variable-length integer.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {number} The byte length.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    setVarUint(byteOffset, value, maxByteLength) {
        return this.setVarInt(byteOffset, value >>> 0, maxByteLength)
    }

    /**
     * Writes the next unsigned, variable-length integer.
     * @param {number} value The value.
     * @param {number} [maxByteLength] The maximum byte length.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    writeVarUint(value, maxByteLength) {
        const byteLength = this.setVarUint(this.byteOffset, value, maxByteLength)
        this.byteOffset += byteLength
    }
    
    /**
     * Gets a signed, variable-length integer with zigzag encoding.
     * @param {number} byteOffset The byte offset.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {IntResult} The result.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#signed_integers
     */
    getVarZint(byteOffset, maxByteLength) {
        const { value, byteLength } = this.getVarInt(byteOffset, maxByteLength)
        return { value: (value >> 1) ^ -(value & 1), byteLength }
    }

    /**
     * Reads the next signed, variable-length integer with zigzag encoding.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {number} The value.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    readVarZint(maxByteLength) {
        const { value, byteLength } = this.getVarZint(this.byteOffset, maxByteLength)
        this.byteOffset += byteLength
        return value
    }

    /**
     * Sets a signed, variable-length integer with zigzag encoding.
     * @param {number} byteOffset The byte offset.
     * @param {number} value The value.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {number} The byte length.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#signed_integers
     */
    setVarZint(byteOffset, value, maxByteLength) {
        return this.setVarInt(byteOffset, (value >> 31) ^ (value << 1), maxByteLength)
    }

    /**
     * Writes the next unsigned, variable-length integer with zigzag encoding.
     * @param {number} value The value.
     * @param {number} [maxByteLength] The maximum byte length.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#varints
     */
    writeVarZint(value, maxByteLength) {
        const byteLength = this.setVarZint(this.byteOffset, value, maxByteLength)
        this.byteOffset += byteLength
    }

    /**
     * Gets an array of unsigned bytes.
     * @param {number} byteOffset The byte offset.
     * @param {number} [byteLength] The byte length.
     * @returns {Uint8Array} The value.
     */
    getUint8Array(byteOffset, byteLength) {
        return new Uint8Array(this.buffer, super.byteOffset + byteOffset, byteLength)
    }

    /**
     * Reads the next array of unsigned bytes.
     * @param {number} [byteLength] The byte length.
     * @returns {Uint8Array} The value.
     */
    readUint8Array(byteLength) {
        const value = this.getUint8Array(this.byteOffset, byteLength)
        this.byteOffset += value.byteLength
        return value
    }

    /**
     * Sets an array of unsigned bytes.
     * @param {number} byteOffset The byte offset.
     * @param {Uint8Array} value The value.
     */
    setUint8Array(byteOffset, value) {
        const byteLength = value.byteLength
        this.getUint8Array(byteOffset, byteLength).set(value)
    }

    /**
     * Writes the next array of unsigned bytes.
     * @param {Uint8Array} value The value.
     */
    writeUint8Array(value) {
        this.setUint8Array(this.byteOffset, value)
        this.byteOffset += value.byteLength
    }

    /**
     * Gets an array of unsigned shorts.
     * @param {number} byteOffset The byte offset.
     * @param {number} [byteLength] The byte length.
     * @returns {Uint16Array} The value.
     */
    getUint16Array(byteOffset, byteLength) {
        if (byteLength !== undefined) {
            byteLength = Math.floor(byteLength / 2)
        }
        return new Uint16Array(this.buffer, super.byteOffset + byteOffset, byteLength)
    }

    /**
     * Reads the next array of unsigned shorts.
     * @param {number} [byteLength] The byte length.
     * @returns {Uint16Array} The value.
     */
    readUint16Array(byteLength) {
        const value = this.getUint16Array(this.byteOffset, byteLength)
        this.byteOffset += value.byteLength
        return value
    }

    /**
     * Sets an array of unsigned bytes.
     * @param {number} byteOffset The byte offset.
     * @param {Uint16Array} value The value.
     */
    setUint16Array(byteOffset, value) {
        const byteLength = value.byteLength
        this.getUint16Array(byteOffset, byteLength).set(value)
    }

    /**
     * Writes the next array of unsigned bytes.
     * @param {Uint16Array} value The value.
     */
    writeUint16Array(value) {
        this.setUint16Array(this.byteOffset, value)
        this.byteOffset += value.byteLength
    }

    /**
     * Gets a string.
     * @param {number} byteOffset The byte offset.
     * @param {number} byteLength The byte length.
     * @param {string} [byteEncoding] The byte encoding.
     * @returns {string} The value.
     */
    getString(byteOffset, byteLength, byteEncoding) {
        const decoder = new TextDecoder(byteEncoding || "utf-8")
        const encoded = this.getUint8Array(byteOffset, byteLength)
        return decoder.decode(encoded)
    }

    /**
     * Reads the next string.
     * @param {number} byteLength The byte length.
     * @param {string} [byteEncoding] The byte encoding.
     * @returns {string} The value.
     */
    readString(byteLength, byteEncoding) {
        const value = this.getString(this.byteOffset, byteLength, byteEncoding)
        this.byteOffset += byteLength
        return value
    }

    /**
     * Sets a string.
     * @param {number} byteOffset The byte offset.
     * @param {string} value The string.
     * @param {string} [byteEncoding] The byte encoding.
     * @returns {number} The byte length.
     */
    setString(byteOffset, value, byteEncoding) {
        // TODO: add support for "utf-16-be" and "utf-16-le"
        if (byteEncoding && byteEncoding !== "utf-8") {
            throw new TypeError("String encoding '" + byteEncoding + "' is not supported")
        }
        const encoder = new TextEncoder()
        const byteLength = Math.min(this.byteLength - byteOffset, value.length * 4)
        const destination = this.getUint8Array(byteOffset, byteLength)
        const { written } = encoder.encodeInto(value, destination)
        return written
    }

    /**
     * Writes the next a string.
     * @param {string} value The string.
     * @param {string} [byteEncoding] The byte encoding.
     */
    writeString(value, byteEncoding) {
        const byteLength = this.setString(this.byteOffset, value, byteEncoding)
        this.byteOffset += byteLength
    }

    /**
     * @typedef {Object} StringResult
     * @property {string} value The value.
     * @property {number} byteLength The byte length.
     */

    /**
     * Gets a String with a variable-length delimeter. 
     * @param {number} byteOffset The byte offset.
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {StringResult} The result.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#strings
     */
    getVarString(byteOffset, maxByteLength) {
        const {
            value: byteLength,
            byteLength: delimeterOffset } = this.getVarUint(byteOffset, maxByteLength)
        const value = this.getString(byteOffset + delimeterOffset, byteLength)
        return { value, byteLength: byteLength + delimeterOffset }
    }

    /**
     * Reads the next String with a variable-length delimeter. 
     * @param {number} [maxByteLength] The maximum byte length.
     * @returns {string} The value.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#strings
     */
    readVarString(maxByteLength) {
        const { value, byteLength } = this.getVarString(this.byteOffset, maxByteLength)
        this.byteOffset += byteLength
        return value
    }

    /**
     * Sets a String with a variable-length delimeter.
     * @param {number} byteOffset The byte offset.
     * @param {string} value The value.
     * @returns {number} The byte length.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#strings
     */
    setVarString(byteOffset, value) {
        const encoder = new TextEncoder()
        const encoded = encoder.encode(value)
        const byteLength = encoded.byteLength
        const delimeterOffset = this.setVarInt(byteOffset, byteLength)
        this.setUint8Array(byteOffset + delimeterOffset, encoded)
        return delimeterOffset + byteLength
    }

    /**
     * Writes the next String with a variable-length delimeter. 
     * @param {string} value The value.
     * @link https://developers.google.com/protocol-buffers/docs/encoding#strings
     */
    writeVarString(value) {
        const byteLength = this.setVarString(this.byteOffset, value)
        this.byteOffset += byteLength
        return byteLength
    }

    /**
     * Formats to a string.
     * @param {string} [format] The string format.
     * @returns {string} The string.
     */
    toString(format) {
        return Array.prototype.map.call(this.getUint8Array(0), function(byte) {
            switch(format) {
                case "hex":
                    return ("00" + byte.toString(16)).slice(-2)
                default:
                    return byte.toString(10)
            }
        }).join(" ")
    }
}
