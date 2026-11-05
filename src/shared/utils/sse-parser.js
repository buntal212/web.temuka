/**
 * Parse a raw SSE event block and deliver via callback.
 *
 * @param {string} rawEvent
 * @param {function(string, object): void} onEvent
 */
function parseRawEvent(rawEvent, onEvent) {
  if (!rawEvent.trim()) return

  let eventName = 'message'
  const dataLines = []

  const lines = rawEvent.split('\n')
  for (const line of lines) {
    if (line.startsWith('event:')) {
      eventName = line.slice(6).trim()
    } else if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).trim())
    }
  }

  if (dataLines.length > 0) {
    const rawData = dataLines.join('\n')
    try {
      const parsed = JSON.parse(rawData)
      onEvent(eventName, parsed)
    } catch {
      // Non-JSON data payload
      onEvent(eventName, { raw: rawData })
    }
  }
}

/**
 * Parse an SSE chunk stream from a fetch Response body.
 * SSR-safe, lightweight, no external dependencies.
 *
 * @param {ReadableStreamDefaultReader} reader
 * @param {function(string, object): void} onEvent (eventName, parsedData)
 * @returns {Promise<void>}
 */
export async function consumeSseStream(reader, onEvent) {
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // Normalize line endings to LF
      buffer = buffer.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

      // SSE events are separated by double newlines (\n\n)
      let boundaryIndex
      while ((boundaryIndex = buffer.indexOf('\n\n')) !== -1) {
        const rawEvent = buffer.slice(0, boundaryIndex)
        buffer = buffer.slice(boundaryIndex + 2)

        parseRawEvent(rawEvent, onEvent)
      }
    }

    // Process any remaining valid trailing event in buffer when stream ends
    if (buffer.trim()) {
      parseRawEvent(buffer, onEvent)
      buffer = ''
    }
  } finally {
    reader.releaseLock()
  }
}
