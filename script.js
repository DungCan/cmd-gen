// Lấy các phần tử DOM cần thiết
const commandTypeSelector = document.getElementById('command-type');
const dynamicContentForm = document.getElementById('dynamic-content-form');
const generateBtn = document.getElementById('generate-btn');
const outputCode = document.getElementById('output-code');
const copyBtn = document.getElementById('copy-btn');
const messageBox = document.getElementById('message-box');
const previewContainer = document.getElementById('preview-container');
const emperorAvatarUrl = "https://cdn.discordapp.com/avatars/1314513638442401822/a_fa3e851e5ad200fa4a77cc8432c69a42.gif?size=4096";
const DAvatarUrl = "https://cdn.discordapp.com/avatars/596934714800078860/9e8abee375624ff2145753d6d372c683.webp?size=4096";
// Hàm tạo form cho /custom type
function createTypeForm() {
    return `
        <h2 class="text-xl font-semibold text-white mb-4">Tham số của \`/custom type\`</h2>
        <div class="space-y-4">
            <div>
                <label for="type-type" class="block text-sm font-medium text-gray-300">Loại</label>
                <select id="type-type" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white">
                    <option value="random">random</option>
                    <option value="pick">pick</option>
                    <option value="math">math</option>
                    <option value="pray">pray</option>
                    <option value="curse">curse</option>
                </select>
            </div>
            <div>
                <label for="type-choose" class="block text-sm font-medium text-gray-300">Kiểu hiển thị</label>
                <select id="type-choose" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white">
                    <option value="text">text</option>
                    <option value="embed">embed</option>
                </select>
            </div>
        </div>
    `;
}

// Hàm tạo form cho /custom toggle
function createToggleForm() {
    return `
        <h2 class="text-xl font-semibold text-white mb-4">Tham số của \`/custom toggle\`</h2>
        <div class="space-y-4">
            <div>
                <label for="toggle-type" class="block text-sm font-medium text-gray-300">Loại</label>
                <select id="toggle-type" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white">
                    <option value="random">random</option>
                    <option value="pick">pick</option>
                    <option value="math">math</option>
                    <option value="pray">pray</option>
                    <option value="curse">curse</option>
                </select>
            </div>
            <div>
                <label for="toggle-enable" class="block text-sm font-medium text-gray-300">Bật/Tắt (enable)</label>
                <select id="toggle-enable" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white">
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>
        </div>
    `;
}

// Hàm tạo form cho /custom text
function createTextForm() {
    const type = document.getElementById('text-type')?.value || 'random';
    let content2Html = '';
    // Ẩn content2 nếu loại lệnh là random
    if (type !== 'random') {
        content2Html = `
            <div>
                <label for="text-content2" class="block text-sm font-medium text-gray-300">Nội dung khi dùng với người khác (\`content2\`, tùy chọn)</label>
                <input type="text" id="text-content2" placeholder="ví dụ: <user> đã nguyền rủa <target>" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
            </div>
        `;
    }
    return `
        <h2 class="text-xl font-semibold text-white mb-4">Tham số của \`/custom text\`</h2>
        <div class="space-y-4">
            <div>
                <label for="text-type" class="block text-sm font-medium text-gray-300">Loại</label>
                <select id="text-type" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white">
                    <option value="random" selected>random</option>
                    <option value="pick">pick</option>
                    <option value="math">math</option>
                    <option value="pray">pray</option>
                    <option value="curse">curse</option>
                </select>
            </div>
            <div>
                <label for="text-content1" class="block text-sm font-medium text-gray-300">Nội dung khi dùng 1 mình (\`content1\`)</label>
                <div class="relative mt-1">
                    <input type="text" id="text-content1" placeholder="ví dụ: Tôi chọn số <number>" class="block w-full px-4 py-2 pr-4 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
                </div>
            </div>
            ${content2Html}
            <div class="bg-[#2a2a3e] p-3 rounded-lg text-sm">
                <p class="font-semibold text-white mb-2">Các tag hỗ trợ:</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-1 bg-gray-600 rounded-md text-gray-200 cursor-pointer" onclick="copyTag('<number>')"><code class="font-mono">&lt;number&gt;</code></span>
                        <p class="text-gray-400">— số ngẫu nhiên</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-1 bg-gray-600 rounded-md text-gray-200 cursor-pointer" onclick="copyTag('<result>')"><code class="font-mono">&lt;result&gt;</code></span>
                        <p class="text-gray-400">— kết quả phép toán</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-1 bg-gray-600 rounded-md text-gray-200 cursor-pointer" onclick="copyTag('<user>')"><code class="font-mono">&lt;user&gt;</code></span>
                        <p class="text-gray-400">— tên người dùng</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-1 bg-gray-600 rounded-md text-gray-200 cursor-pointer" onclick="copyTag('<target>')"><code class="font-mono">&lt;target&gt;</code></span>
                        <p class="text-gray-400">— tên người bị chọn</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Hàm tạo form cho /custom embed
function createEmbedForm() {
    return `
        <h2 class="text-xl font-semibold text-white mb-4">Tham số của \`/custom embed\`</h2>
        <div class="space-y-4">
            <div>
                <label for="embed-type" class="block text-sm font-medium text-gray-300">Loại</label>
                <select id="embed-type" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white">
                    <option value="random">random</option>
                    <option value="pick">pick</option>
                    <option value="math">math</option>
                    <option value="pray">pray</option>
                    <option value="curse">curse</option>
                </select>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex-grow">
                    <label for="embed-hex-color" class="block text-sm font-medium text-gray-300">Màu HEX (\`hex_color\`)</label>
                    <input type="text" id="embed-hex-color" placeholder="#7289da" value="#7289da" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
                </div>
                <div>
                    <label for="color-picker" class="block text-sm font-medium text-gray-300">Chọn màu</label>
                    <input type="color" id="color-picker" value="#7289da" class="mt-1 block w-10 h-10 p-1 border-gray-300 rounded-md shadow-sm">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-300">(\`description\`)</label>
                <p id="embed-description-preview" class="text-gray-400 text-sm mt-1">Đây là dòng Description sẽ xuất hiện</p>
            </div>
            <div>
                <label for="embed-author-name" class="block text-sm font-medium text-gray-300">(\`author_name\`)</label>
                <input type="text" id="embed-author-name" placeholder="Tên tác giả" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
            </div>
            <div>
                <label for="embed-author-icon" class="block text-sm font-medium text-gray-300">(\`author_icon\`)</label>
                <input type="text" id="embed-author-icon" placeholder="https://example.com/icon.png" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
            </div>
            <div>
                <label for="embed-title-text" class="block text-sm font-medium text-gray-300">(\`title_text\`)</label>
                <input type="text" id="embed-title-text" placeholder="Tiêu đề của bạn" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
            </div>
            <div>
                <label for="embed-image" class="block text-sm font-medium text-gray-300">(\`image url\`)</label>
                <input type="text" id="embed-image" placeholder="https://example.com/image.png" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
            </div>
            <div>
                <label for="embed-thumbnail" class="block text-sm font-medium text-gray-300">(\`thumbnail\`)</label>
                <input type="text" id="embed-thumbnail" placeholder="https://example.com/thumb.png" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
            </div>
            <div>
                <label for="embed-footer-text" class="block text-sm font-medium text-gray-300">(\`footer_text\`)</label>
                <input type="text" id="embed-footer-text" placeholder="Chân trang" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
            </div>
            <div>
                <label for="embed-footer-icon" class="block text-sm font-medium text-gray-300">(\`footer_icon\`)</label>
                <input type="text" id="embed-footer-icon" placeholder="https://example.com/icon.png" class="mt-1 block w-full px-4 py-2 bg-[#4b4b66] border border-[#5c5c7d] rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400">
            </div>
        </div>
    `;
}

// Cập nhật form dựa trên subcommand đã chọn
function updateForm() {
    const subcommand = commandTypeSelector.value;
    dynamicContentForm.innerHTML = '';
    let formsToBind = [];

    if (subcommand === 'type') {
        dynamicContentForm.innerHTML = createTypeForm();
        formsToBind = dynamicContentForm.querySelectorAll('input, select, textarea');
    } else if (subcommand === 'toggle') {
        dynamicContentForm.innerHTML = createToggleForm();
        formsToBind = dynamicContentForm.querySelectorAll('input, select, textarea');
    } else if (subcommand === 'text') {
        dynamicContentForm.innerHTML = createTextForm();
        formsToBind = dynamicContentForm.querySelectorAll('input, select, textarea');
        const textTypeSelector = document.getElementById('text-type');
        if (textTypeSelector) {
            textTypeSelector.addEventListener('change', () => {
                const currentContent1 = document.getElementById('text-content1')?.value;
                dynamicContentForm.innerHTML = createTextForm();
                const newContent1 = document.getElementById('text-content1');
                if (newContent1 && currentContent1) {
                     newContent1.value = currentContent1;
                }
                updatePreview();
            });
        }
    } else if (subcommand === 'embed') {
        dynamicContentForm.innerHTML = createEmbedForm();
        formsToBind = dynamicContentForm.querySelectorAll('input, select, textarea');

        // Bind color picker to hex input
        const hexColorInput = document.getElementById('embed-hex-color');
        const colorPicker = document.getElementById('color-picker');

        hexColorInput.addEventListener('input', () => {
            colorPicker.value = hexColorInput.value;
            updatePreview();
        });
        colorPicker.addEventListener('input', () => {
            hexColorInput.value = colorPicker.value;
            updatePreview();
        });
    }

    formsToBind.forEach(input => {
        input.addEventListener('input', updatePreview);
        input.addEventListener('change', updatePreview);
    });
    
    updatePreview();
}

// Cập nhật preview
function updatePreview() {
    const subcommand = commandTypeSelector.value;
    previewContainer.innerHTML = ''; // Xóa nội dung cũ

    if (subcommand === 'type') {
        const type = document.getElementById('type-type').value;
        const choose = document.getElementById('type-choose').value;

        previewContainer.innerHTML = `
            <div class="discord-message">
                <img class="discord-message-avatar" src="${DAvatarUrl}" alt="User Avatar">
                <div class="discord-message-content">
                    <div class="discord-message-header">
                        <span class="discord-message-user">Dunz</span>
                        <span class="discord-message-timestamp">7:14 CH</span>
                    </div>
                    <div class="discord-message-text">/custom type type:${type} choose:${choose}</div>
                </div>
            </div>
            <div class="discord-message">
                <img class="discord-message-avatar" src="${emperorAvatarUrl}" alt="Bot Avatar">
                <div class="discord-message-content">
                    <div class="discord-message-header">
                        <span class="discord-message-user">Emperor</span>
                        <span class="text-xs text-white bg-purple-600 px-1 rounded-sm">✅ APP</span>
                        <span class="discord-message-timestamp">7:14 CH</span>
                    </div>
                    <div class="discord-message-text">Đã cập nhật kiểu phản hồi của \`${type}\` thành \`${choose}\`</div>
                </div>
            </div>
        `;

    } else if (subcommand === 'toggle') {
        const type = document.getElementById('toggle-type').value;
        const enable = document.getElementById('toggle-enable').value;
        const status = enable === 'true' ? 'bật' : 'tắt';

        previewContainer.innerHTML = `
            <div class="discord-message">
                <img class="discord-message-avatar" src="${DAvatarUrl}" alt="User Avatar">
                <div class="discord-message-content">
                    <div class="discord-message-header">
                        <span class="discord-message-user">Dunz</span>
                        <span class="discord-message-timestamp">7:14 CH</span>
                    </div>
                    <div class="discord-message-text">/custom toggle type:${type} enable:${enable}</div>
                </div>
            </div>
            <div class="discord-message">
                <img class="discord-message-avatar" src="${emperorAvatarUrl}" alt="Bot Avatar">
                <div class="discord-message-content">
                    <div class="discord-message-header">
                        <span class="discord-message-user">Emperor</span>
                        <span class="text-xs text-white bg-purple-600 px-1 rounded-sm">APP</span>
                        <span class="discord-message-timestamp">7:14 CH</span>
                    </div>
                    <div class="discord-message-text">Đã ${status} lệnh \`${type}\` thành công.</div>
                </div>
            </div>
        `;

    } else if (subcommand === 'text') {
        const type = document.getElementById('text-type').value;
        const content1 = document.getElementById('text-content1')?.value.trim() || "Nội dung phản hồi mặc định";
        const content2Element = document.getElementById('text-content2');
        const content2 = content2Element ? content2Element.value.trim() : "";
        
        let previewText = content1.replace(/<user>/g, 'Dunz').replace(/<target>/g, 'Emperor').replace(/<number>/g, '4').replace(/<result>/g, '2');

        previewContainer.innerHTML = `
            <div class="discord-message">
                <img class="discord-message-avatar" src="${DAvatarUrl}" alt="User Avatar">
                <div class="discord-message-content">
                    <div class="discord-message-header">
                        <span class="discord-message-user">Dunz</span>
                        <span class="discord-message-timestamp">7:14 CH</span>
                    </div>
                    <div class="discord-message-text">/custom text type:${type} content1:${content1}${content2 ? ` content2:${content2}` : ''}</div>
                </div>
            </div>
            <div class="discord-message">
                <img class="discord-message-avatar" src="${emperorAvatarUrl}" alt="Bot Avatar">
                <div class="discord-message-content">
                    <div class="discord-message-header">
                        <span class="discord-message-user">Emperor</span>
                        <span class="text-xs text-white bg-purple-600 px-1 rounded-sm">APP</span>
                        <span class="discord-message-timestamp">7:14 CH</span>
                    </div>
                    <div class="discord-message-text">${previewText}</div>
                </div>
            </div>
        `;
    } else if (subcommand === 'embed') {
        const type = document.getElementById('embed-type').value;
        const hexColor = document.getElementById('embed-hex-color')?.value.trim() || "#7289da";
        const description = "Đây là dòng Description sẽ xuất hiện"; // Fixed description for preview only
        const authorName = document.getElementById('embed-author-name')?.value.trim();
        const authorIcon = document.getElementById('embed-author-icon')?.value.trim() || "https://placehold.co/24x24/1e1e2d/white?text=A";
        const titleText = document.getElementById('embed-title-text')?.value.trim();
        const image = document.getElementById('embed-image')?.value.trim();
        const thumbnail = document.getElementById('embed-thumbnail')?.value.trim();
        const footerText = document.getElementById('embed-footer-text')?.value.trim();
        const footerIcon = document.getElementById('embed-footer-icon')?.value.trim() || "https://placehold.co/16x16/1e1e2d/white?text=F";

        let embedHtml = `
            <div class="discord-message">
                <img class="discord-message-avatar" src="${DAvatarUrl}" alt="User Avatar">
                <div class="discord-message-content">
                    <div class="discord-message-header">
                        <span class="discord-message-user">Dunz</span>
                        <span class="discord-message-timestamp">7:14 CH</span>
                    </div>
                    <div class="discord-message-text">/custom embed ...</div>
                </div>
            </div>
            <div class="discord-message">
                <img class="discord-message-avatar" src="${emperorAvatarUrl}" alt="Bot Avatar">
                <div class="discord-message-content">
                    <div class="discord-message-header">
                        <span class="discord-message-user">Emperor</span>
                        <span class="text-xs text-white bg-purple-600 px-1 rounded-sm">APP</span>
                        <span class="discord-message-timestamp">7:14 CH</span>
                    </div>
                    <div class="discord-embed" style="border-left-color: ${hexColor}">
                        <div class="discord-embed-content">
                            ${authorName ? `<div class="discord-embed-author">
                                <img src="${authorIcon}" onerror="this.onerror=null;this.src='https://placehold.co/24x24/2f3136/white?text=A';" alt="Author Icon" class="discord-embed-author-icon">
                                <span class="discord-embed-author-name">${authorName}</span>
                            </div>` : ''}
                            ${titleText ? `<div class="discord-embed-title">${titleText}</div>` : ''}
                            ${description ? `<div class="discord-embed-description">${description}</div>` : ''}
                            ${image ? `<img src="${image}" onerror="this.onerror=null;this.src='https://placehold.co/600x200/2f3136/white?text=Image+not+found';" alt="Image" class="discord-embed-image">` : ''}
                            ${footerText ? `<div class="discord-embed-footer">
                                <img src="${footerIcon}" onerror="this.onerror=null;this.src='https://placehold.co/16x16/2f3136/white?text=F';" alt="Footer Icon" class="discord-embed-footer-icon">
                                <span>${footerText}</span>
                            </div>` : ''}
                        </div>
                        ${thumbnail ? `<div class="flex-shrink-0">
                            <img src="${thumbnail}" onerror="this.onerror=null;this.src='https://placehold.co/64x64/2f3136/white?text=T';" alt="Thumbnail" class="discord-embed-thumbnail">
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `;
        previewContainer.innerHTML = embedHtml;
    }
}

// Sự kiện khi nhấn nút "Tạo Lệnh"
generateBtn.addEventListener('click', () => {
    const subcommand = commandTypeSelector.value;
    let generatedCommand = `/custom ${subcommand}`;

    if (subcommand === 'type') {
        const type = document.getElementById('type-type').value;
        const choose = document.getElementById('type-choose').value;
        generatedCommand += ` type:${type} choose:${choose}`;
    } else if (subcommand === 'toggle') {
        const type = document.getElementById('toggle-type').value;
        const enable = document.getElementById('toggle-enable').value;
        generatedCommand += ` type:${type} enable:${enable}`;
    } else if (subcommand === 'text') {
        const type = document.getElementById('text-type').value;
        const content1 = document.getElementById('text-content1').value.trim();
        generatedCommand += ` type:${type} content1:${content1}`;
        const content2Element = document.getElementById('text-content2');
        if (content2Element) {
            const content2 = content2Element.value.trim();
            if (content2) {
                generatedCommand += ` content2:${content2}`;
            }
        }
    } else if (subcommand === 'embed') {
        const type = document.getElementById('embed-type').value;
        const hexColor = document.getElementById('embed-hex-color').value.trim();
        // Description is not added to the command
        const authorName = document.getElementById('embed-author-name').value.trim();
        const authorIcon = document.getElementById('embed-author-icon').value.trim();
        const titleText = document.getElementById('embed-title-text').value.trim();
        const image = document.getElementById('embed-image').value.trim();
        const thumbnail = document.getElementById('embed-thumbnail').value.trim();
        const footerText = document.getElementById('embed-footer-text').value.trim();
        const footerIcon = document.getElementById('embed-footer-icon').value.trim();
        
        generatedCommand += ` type:${type}`;
        if (hexColor) generatedCommand += ` hex_color:${hexColor}`;
        if (authorName) generatedCommand += ` author_name:${authorName}`;
        if (authorIcon) generatedCommand += ` author_icon:${authorIcon}`;
        if (titleText) generatedCommand += ` title_text:${titleText}`;
        if (image) generatedCommand += ` image:${image}`;
        if (thumbnail) generatedCommand += ` thumbnail:${thumbnail}`;
        if (footerText) generatedCommand += ` footer_text:${footerText}`;
        if (footerIcon) generatedCommand += ` footer_icon:${footerIcon}`;
    }
    
    outputCode.value = generatedCommand;
});

// Hàm để sao chép nội dung vào clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            messageBox.textContent = 'Đã sao chép!';
            messageBox.classList.remove('opacity-0');
            messageBox.classList.add('opacity-100');
            setTimeout(() => {
                messageBox.classList.remove('opacity-100');
                messageBox.classList.add('opacity-0');
            }, 2000);
        }).catch(err => {
            console.error('Lỗi khi sao chép:', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        messageBox.textContent = 'Đã sao chép (fallback)!';
        messageBox.classList.remove('opacity-0');
        messageBox.classList.add('opacity-100');
        setTimeout(() => {
            messageBox.classList.remove('opacity-100');
            messageBox.classList.add('opacity-0');
        }, 2000);
    } catch (err) {
        console.error('Không thể sao chép bằng fallback:', err);
    }
    document.body.removeChild(textArea);
}

copyBtn.addEventListener('click', () => {
    if (outputCode.value) {
        copyToClipboard(outputCode.value);
    }
});

// Hàm để sao chép tag vào clipboard
function copyTag(tag) {
    copyToClipboard(tag);
}

// Gán hàm copyTag vào window để có thể gọi từ HTML onclick
window.copyTag = copyTag;

// Gắn sự kiện `input` và `change` cho các trường chính
commandTypeSelector.addEventListener('change', updateForm);

// Khởi tạo form và preview lần đầu
updateForm();
