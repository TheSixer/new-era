/**
 * 颜色工具函数
 */

/**
 * hex转Rgba
 *
 * @export
 * @param {string} hex
 * @param {number} opacity
 * @returns
 */
export function hexToRgba(hex: string, opacity: number) {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16), opacity]
}
