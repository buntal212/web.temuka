import test from 'node:test'
import assert from 'node:assert/strict'
import { consumeSseStream } from 'src/shared/utils/sse-parser.js'

function createMockReader(chunks) {
  const encoder = new TextEncoder()
  let index = 0

  return {
    async read() {
      if (index >= chunks.length) {
        return { done: true, value: undefined }
      }
      const val = encoder.encode(chunks[index++])
      return { done: false, value: val }
    },
    releaseLock() {},
  }
}

test('consumeSseStream correctly parses standard events', async () => {
  const chunks = [
    'event: search_init\ndata: {"search_id":"s1","targets":["mock_larissama"]}\n\n',
    'event: source_result\ndata: {"search_id":"s1","source":"mock_larissama","items_count":1}\n\n',
    'event: search_done\ndata: {"search_id":"s1","total_items":1}\n\n',
  ]

  const events = []
  await consumeSseStream(createMockReader(chunks), (event, data) => {
    events.push({ event, data })
  })

  assert.equal(events.length, 3)
  assert.equal(events[0].event, 'search_init')
  assert.equal(events[0].data.search_id, 's1')
  assert.equal(events[1].event, 'source_result')
  assert.equal(events[1].data.source, 'mock_larissama')
  assert.equal(events[2].event, 'search_done')
  assert.equal(events[2].data.total_items, 1)
})

test('consumeSseStream correctly parses canonical v1 source_result event with object source and meta', async () => {
  const canonicalChunk = [
    'event: source_result\n' +
      'data: {"search_id":"s1","status":"completed","source":{"code":"mock_larissama","name":"Larissama F&B"},' +
      '"data":[{"id":"lrs-001","code":"MNU-001","name":"Nasi Goreng","category":"Makanan","price":{"amount":25000,"currency":"IDR"},' +
      '"image":{"url":"https://example.com/img.jpg"},"availability":"available",' +
      '"provider":{"id":"10","code":"WRG-001","name":"Warung Berkah","image":null,' +
      '"contact":{"phone":"081234","whatsapp":null},"location":{"address":"Jl. Kaliurang","latitude":null,"longitude":null}}}],' +
      '"meta":{"total":1},"items_count":1}\n\n',
  ]

  const events = []
  await consumeSseStream(createMockReader(canonicalChunk), (event, data) => {
    events.push({ event, data })
  })

  assert.equal(events.length, 1)
  assert.equal(events[0].event, 'source_result')
  assert.equal(events[0].data.source.code, 'mock_larissama')
  assert.equal(events[0].data.source.name, 'Larissama F&B')
  assert.equal(events[0].data.meta.total, 1)
  assert.equal(events[0].data.data.length, 1)
  assert.equal(events[0].data.data[0].price.amount, 25000)
  assert.equal(events[0].data.data[0].provider.location.address, 'Jl. Kaliurang')
})

test('consumeSseStream handles events split across chunk boundaries', async () => {
  // Split event data in half
  const chunks = [
    'event: source_result\ndata: {"search_id":"s2",',
    '"source":{"code":"mock_laundry","name":"Laundry Kilat"},"meta":{"total":2},"items_count":2}\n\n',
  ]

  const events = []
  await consumeSseStream(createMockReader(chunks), (event, data) => {
    events.push({ event, data })
  })

  assert.equal(events.length, 1)
  assert.equal(events[0].event, 'source_result')
  assert.equal(events[0].data.search_id, 's2')
  assert.equal(events[0].data.source.code, 'mock_laundry')
  assert.equal(events[0].data.meta.total, 2)
})

test('consumeSseStream handles source_failed event', async () => {
  const chunks = [
    'event: source_failed\ndata: {"search_id":"s3","source":"mock_aset","status":"failed","error_code":"TIMEOUT"}\n\n',
  ]

  const events = []
  await consumeSseStream(createMockReader(chunks), (event, data) => {
    events.push({ event, data })
  })

  assert.equal(events.length, 1)
  assert.equal(events[0].event, 'source_failed')
  assert.equal(events[0].data.source, 'mock_aset')
  assert.equal(events[0].data.error_code, 'TIMEOUT')
})

test('consumeSseStream correctly flushes remaining event when stream ends without trailing double newline', async () => {
  const chunks = [
    'event: search_init\ndata: {"search_id":"s4","targets":["larissama"]}\n\n',
    'event: search_done\ndata: {"search_id":"s4","total_items":0}', // Notice: no trailing newline
  ]

  const events = []
  await consumeSseStream(createMockReader(chunks), (event, data) => {
    events.push({ event, data })
  })

  assert.equal(events.length, 2)
  assert.equal(events[0].event, 'search_init')
  assert.equal(events[1].event, 'search_done')
  assert.equal(events[1].data.search_id, 's4')
  assert.equal(events[1].data.total_items, 0)
})

test('consumeSseStream handles malformed JSON without crashing, falling back to raw data', async () => {
  const chunks = [
    'event: custom_warning\ndata: { malformed json syntax here\n\n',
  ]

  const events = []
  await consumeSseStream(createMockReader(chunks), (event, data) => {
    events.push({ event, data })
  })

  assert.equal(events.length, 1)
  assert.equal(events[0].event, 'custom_warning')
  assert.equal(events[0].data.raw, '{ malformed json syntax here')
})

test('consumeSseStream parses multiple events packed into a single chunk', async () => {
  const singleChunk = [
    'event: search_init\ndata: {"search_id":"pack_1"}\n\nevent: search_done\ndata: {"search_id":"pack_1"}\n\n',
  ]

  const events = []
  await consumeSseStream(createMockReader(singleChunk), (event, data) => {
    events.push({ event, data })
  })

  assert.equal(events.length, 2)
  assert.equal(events[0].event, 'search_init')
  assert.equal(events[1].event, 'search_done')
})
