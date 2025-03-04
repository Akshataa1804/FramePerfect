const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({ log: true });

const loadFFmpeg = async () => {
    try {
        console.log("Loading FFmpeg...");
        await ffmpeg.load();
        console.log("FFmpeg loaded successfully!");
    } catch (error) {
        console.error("Error loading FFmpeg:", error);
    }
};

loadFFmpeg();
