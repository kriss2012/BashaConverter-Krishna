# BhashaConverter - AI-Driven Multilingual Content Processing System

A comprehensive, client-side multilingual translation and content processing system built with HTML, CSS, and JavaScript. This project provides free, API-key-free translation services using Google Translate's public endpoints and client-side processing libraries.

## 🌟 Features

### 1. Text Translation Engine
- **Multi-language Support**: Hindi, Marathi, Gujarati, Tamil, Bengali, English, Telugu, Kannada
- **Context-aware Translation**: Legal, Medical, Education, eCommerce domains
- **Grammar Correction**: Automatic grammar fixing and sentence restructuring
- **Style Transfer**: Formal/informal tone adaptation
- **Real-time Translation**: Instant translation with Google Translate integration

### 2. Voice & Audio Translation
- **Live Speech Recognition**: Real-time speech-to-text using Web Speech API
- **Audio File Support**: MP3, WAV file uploads
- **Speaker Diarization**: Automatic speaker identification and timestamping
- **Continuous Translation**: Live translation during speech

### 3. Document Translation
- **Multiple Formats**: PDF, DOCX, PPTX support
- **Format Preservation**: Maintains original document structure
- **Side-by-side Preview**: Compare original and translated content
- **Auto Language Detection**: Automatic source language identification
- **Batch Processing**: Handle large documents efficiently

### 4. Video Content Translation
- **Video Upload Support**: MP4, AVI, MOV files
- **Audio Extraction**: Automatic audio processing and transcription
- **Subtitle Generation**: SRT/VTT format with timestamping
- **OCR Integration**: Extract text from video frames using Tesseract.js
- **Speaker Identification**: Track multiple speakers in video content

### 5. Real-Time Chat Translator
- **Multilingual Chat**: Support for all supported languages
- **Message Translation**: Individual message translation
- **Chat History**: Persistent conversation storage
- **Export Options**: Download chat as TXT or JSON
- **WhatsApp/Telegram Ready**: Integration-ready for messaging platforms

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Microphone access for speech features
- No API keys required - uses free public endpoints

### Installation
1. Clone or download the project files
2. Open `BashaConverter-Krishna.html` in your web browser
3. Allow microphone access when prompted
4. Start translating!

### Usage

#### Text Translation
1. Select source and target languages
2. Choose domain context (if applicable)
3. Enter text in the input area
4. Click "Translate" or use voice input
5. Copy, download, or have the result spoken

#### Voice Translation
1. Click "Start Mic" to begin speech recognition
2. Speak clearly into your microphone
3. Use "Start Live Translate" for continuous translation
4. Stop when finished

#### Document Translation
1. Upload PDF, DOCX, or PPTX files
2. Wait for document parsing
3. Click "Translate Document"
4. View side-by-side comparison
5. Download translated content

#### Video Translation
1. Upload video file or provide link
2. Use "Transcribe" to capture audio
3. Play video loudly near microphone
4. Extract text from frames using OCR
5. Download subtitles in SRT/VTT format

#### Chat Translation
1. Type message in chat input
2. Select languages
3. Click "Translate & Send"
4. View conversation history
5. Export or download chat logs

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom glassmorphism design
- **Translation**: Google Translate public API
- **Speech Recognition**: Web Speech API
- **Document Processing**: 
  - Mammoth.js (DOCX)
  - PDF.js (PDF)
  - JSZip (PPTX)
- **OCR**: Tesseract.js
- **UI Framework**: Custom responsive design

### Architecture
- **Client-side Only**: No server required
- **Progressive Enhancement**: Works without JavaScript for basic features
- **Responsive Design**: Mobile and desktop optimized
- **Modular Code**: Separate functions for each feature
- **Error Handling**: Comprehensive error management

### Free Resources Used
- Google Translate public endpoints
- Web Speech API (browser native)
- Client-side document parsing libraries
- Tesseract.js OCR (client-side)
- No paid APIs or services

## 🔧 Customization

### Adding New Languages
1. Update the `LANG_TO_LOCALE` object in the JavaScript
2. Add language options to HTML select elements
3. Update language-specific grammar rules

### Modifying Translation Logic
1. Edit the `translateText()` function
2. Modify domain context handling
3. Add custom translation providers

### Styling Changes
1. Modify CSS variables in the `<style>` section
2. Update Tailwind configuration
3. Customize glassmorphism effects

## 📱 Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support (macOS 10.14+)
- **Edge**: Full support
- **Mobile Browsers**: Responsive design support

## 🚨 Limitations & Considerations

### Current Limitations
- Video link processing requires server-side implementation
- Audio file transcription limited to browser capabilities
- Large document processing may be slow on older devices
- OCR accuracy depends on video quality and text clarity

### Browser Requirements
- HTTPS required for microphone access
- Modern JavaScript support needed
- Web Speech API support required for voice features

### Performance Notes
- Large files may cause temporary browser slowdown
- Video processing is resource-intensive
- Multiple simultaneous translations may impact performance

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Areas for Improvement
- Server-side video processing
- Advanced OCR capabilities
- Machine learning integration
- Additional language support
- Performance optimization

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Krishna Patil**
- Email: 202krishnapatil@gmail.com
- Phone: +91 95801 59631
- LinkedIn: [Krishna Chandrakant Patil](https://in.linkedin.com/in/krishna-chandrakant-patil-33969536b)

## 🙏 Acknowledgments

- Google Translate for free translation services
- Open-source library contributors
- Web Speech API developers
- Tesseract.js OCR team
- Mammoth.js and PDF.js contributors

## 📞 Support

For technical support or feature requests:
- Create an issue in the repository
- Contact the author directly
- Check browser compatibility first

---

**Built with ❤️ using HTML/CSS/JS - No server required, completely free to use!**
