/**
 * Resolve FFmpeg without downloading a platform-specific binary.
 *
 * Termux provides FFmpeg through `pkg install ffmpeg`; using the command
 * from PATH works on Android and on Linux/macOS/Windows environments that
 * expose FFmpeg. Set FFMPEG_PATH to override it when needed.
 */
module.exports = process.env.FFMPEG_PATH || 'ffmpeg';
