import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const MAX_SIZE_MB = 25;
const PUBLIC_DIR = './public';

function getFileSizeMB(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size / (1024 * 1024);
}

function compressMP3(inputPath, outputPath, bitrate = '96k') {
    return new Promise((resolve, reject) => {
        const command = `ffmpeg -i "${inputPath}" -b:a ${bitrate} -ar 44100 "${outputPath}" -y`;
        
        console.log(`Compressing ${path.basename(inputPath)} with bitrate ${bitrate}...`);
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(outputPath);
        });
    });
}

async function processMP3Files() {
    try {
        // Get all MP3 files in public directory
        const files = fs.readdirSync(PUBLIC_DIR)
            .filter(file => file.endsWith('.mp3'))
            .map(file => path.join(PUBLIC_DIR, file));

        console.log(`Found ${files.length} MP3 files to process...`);

        for (const filePath of files) {
            const fileName = path.basename(filePath);
            const fileSizeMB = getFileSizeMB(filePath);
            
            console.log(`\nProcessing: ${fileName} (${fileSizeMB.toFixed(2)} MB)`);
            
            if (fileSizeMB <= MAX_SIZE_MB) {
                console.log(`✅ ${fileName} is already under ${MAX_SIZE_MB}MB, skipping...`);
                continue;
            }

            // Create backup of original file
            const backupPath = filePath.replace('.mp3', '-original.mp3');
            fs.copyFileSync(filePath, backupPath);
            console.log(`📁 Created backup: ${path.basename(backupPath)}`);

            // Try different bitrates to get under 25MB
            const bitrates = ['96k', '80k', '64k'];
            let compressed = false;

            for (const bitrate of bitrates) {
                try {
                    const tempPath = filePath.replace('.mp3', `-temp-${bitrate}.mp3`);
                    await compressMP3(filePath, tempPath, bitrate);
                    
                    const newSizeMB = getFileSizeMB(tempPath);
                    console.log(`   Bitrate ${bitrate}: ${newSizeMB.toFixed(2)} MB`);
                    
                    if (newSizeMB <= MAX_SIZE_MB) {
                        // Replace original with compressed version
                        fs.unlinkSync(filePath);
                        fs.renameSync(tempPath, filePath);
                        console.log(`✅ Successfully compressed ${fileName} to ${newSizeMB.toFixed(2)} MB`);
                        compressed = true;
                        break;
                    } else {
                        // Remove temp file and try next bitrate
                        fs.unlinkSync(tempPath);
                    }
                } catch (error) {
                    console.log(`   ❌ Failed with bitrate ${bitrate}: ${error.message}`);
                }
            }

            if (!compressed) {
                console.log(`❌ Could not compress ${fileName} to under ${MAX_SIZE_MB}MB`);
            }
        }

        console.log('\n🎉 MP3 compression process completed!');
        
    } catch (error) {
        console.error('Error processing MP3 files:', error);
        process.exit(1);
    }
}

// Run the script
processMP3Files();
