export const decompressArrayBuffer = async e => { let t = new DecompressionStream("gzip"), r = t.writable.getWriter(); r.write(e), r.close(); let a = [], l = t.readable.getReader(), n = 0; for (; ;) { let { value: s, done: f } = await l.read(); if (f) break; a.push(s), n += s.byteLength } let i = new Uint8Array(n), o = 0; for (let b of a) i.set(b, o), o += b.byteLength; return i };
export default decompressArrayBuffer;