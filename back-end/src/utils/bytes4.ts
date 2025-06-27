import { toBytes, toHex } from 'viem';

export function stringToBytes4(str: string): string {
  // Converte a string para bytes e pega os primeiros 4 bytes
  const bytes = toBytes(str);
  const truncatedBytes = bytes.slice(0, 4);
  return toHex(truncatedBytes, { size: 4 });
}

export function isBytes4(value: string): boolean {
  // Verifica se é uma string hex válida de 4 bytes
  return /^0x[0-9a-fA-F]{8}$/.test(value);
}
