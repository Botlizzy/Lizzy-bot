let cached;

module.exports = function getSharp() {
  if (cached !== undefined) return cached;

  try {
    cached = require('sharp');
  } catch (error) {
    cached = null;
    if (process.env.DEBUG_NATIVE_DEPS === '1') {
      console.warn(`Sharp is unavailable; image conversion fallbacks will be used: ${error.message}`);
    }
  }

  return cached;
};
