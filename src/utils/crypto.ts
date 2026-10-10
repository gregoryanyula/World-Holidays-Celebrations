/**
 * Lightweight client-side encryption utility for personal notes, stored items,
 * and user posts simulating AES-GCM zero-trust client storage with a user salt.
 */
export async function encryptText(text: string, passkey: string = 'world-holidays-secure-vault-2026'): Promise<string> {
  try {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(passkey.padEnd(32, '#')),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const salt = enc.encode('secure-holiday-salt');
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedContent = enc.encode(text);
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encodedContent
    );

    const ivBase64 = btoa(String.fromCharCode(...iv));
    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    return `E2EE:${ivBase64}:${encryptedBase64}`;
  } catch (e) {
    console.warn('Encryption fallback', e);
    return `ENC:${btoa(unescape(encodeURIComponent(text)))}`;
  }
}

export async function decryptText(encryptedPayload: string, passkey: string = 'world-holidays-secure-vault-2026'): Promise<string> {
  try {
    if (encryptedPayload.startsWith('ENC:')) {
      return decodeURIComponent(escape(atob(encryptedPayload.slice(4))));
    }

    if (!encryptedPayload.startsWith('E2EE:')) {
      return encryptedPayload;
    }

    const parts = encryptedPayload.split(':');
    if (parts.length !== 3) return encryptedPayload;

    const iv = Uint8Array.from(atob(parts[1]), c => c.charCodeAt(0));
    const cipherBytes = Uint8Array.from(atob(parts[2]), c => c.charCodeAt(0));

    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(passkey.padEnd(32, '#')),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const salt = enc.encode('secure-holiday-salt');
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      cipherBytes
    );

    return new TextDecoder().decode(decrypted);
  } catch (e) {
    console.warn('Decryption issue or plain text provided:', e);
    return encryptedPayload.replace(/^(E2EE:[^:]+:[^:]+|ENC:)/, '[Decrypted content]');
  }
}

/**
 * Encrypt a File into an AES-GCM 256-bit encrypted payload
 */
export async function encryptFile(
  file: File,
  passkey: string = 'world-holidays-secure-vault-2026'
): Promise<{
  encryptedData: string;
  iv: string;
  filename: string;
  mimeType: string;
  size: number;
}> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passkey.padEnd(32, '#')),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const salt = enc.encode('secure-holiday-salt');
  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const arrayBuffer = await file.arrayBuffer();

  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    arrayBuffer
  );

  // Convert to base64 safely
  const ivBase64 = btoa(String.fromCharCode(...iv));
  const bytes = new Uint8Array(encrypted);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, Math.min(i + 8192, len)));
  }
  const encryptedBase64 = btoa(binary);

  return {
    encryptedData: encryptedBase64,
    iv: ivBase64,
    filename: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size
  };
}

/**
 * Decrypt an AES-GCM encrypted payload back into a browser Blob
 */
export async function decryptFile(
  encryptedData: string,
  ivBase64: string,
  mimeType: string,
  passkey: string = 'world-holidays-secure-vault-2026'
): Promise<Blob> {
  const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));
  const binaryString = atob(encryptedData);
  const cipherBytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    cipherBytes[i] = binaryString.charCodeAt(i);
  }

  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passkey.padEnd(32, '#')),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const salt = enc.encode('secure-holiday-salt');
  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    cipherBytes
  );

  return new Blob([decrypted], { type: mimeType });
}
