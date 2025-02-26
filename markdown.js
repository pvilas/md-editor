
// Get all editor containers
const editorContainers = document.querySelectorAll('.editor-container');
    
editorContainers.forEach(container => {

    const editor = container.querySelector('.editor-area');
    const highlight = container.querySelector('.highlight');        
    const resizeHandle = container.querySelector('.resize-handle');
    
    
    // Sync scrolling between textarea and highlight div
    editor.addEventListener('scroll', () => {
        highlight.scrollTop = editor.scrollTop;
        highlight.scrollLeft = editor.scrollLeft;
    });
    
    // Update highlighting when text changes
    editor.addEventListener('input', updateHighlighting);
    
    // Initial highlighting
    updateHighlighting();
    
    // Custom resize functionality
    let isResizing = false;
    let lastX, lastY;
    
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        lastX = e.clientX;
        lastY = e.clientY;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        
        const newWidth = container.offsetWidth + deltaX;
        const newHeight = container.offsetHeight + deltaY;
        
        container.style.width = newWidth + 'px';
        container.style.height = newHeight + 'px';
        
        lastX = e.clientX;
        lastY = e.clientY;
    });
    
    document.addEventListener('mouseup', () => {
        isResizing = false;
    });
    
    function updateHighlighting() {
        let text = editor.value;
        
        // Escape HTML to prevent XSS
        text = text.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
        
        // Process the text line by line to avoid cross-line matching issues
        const lines = text.split('\n');
        const processedLines = lines.map(line => {
            // code block
            if (line.match(/^```/)) {
                return line.replace(/^```(.*?)```$/, '<span class="md-code-block">```$1```</span>');
            }
            // Headers
            else if (line.match(/^#{1,6}\s+/)) {
                return line.replace(/^(#{1,6})\s+(.*?)$/, '<span class="md-heading">$1 $2</span>');
            }
            // Block quotes
            else if (line.match(/^&gt;\s+/)) {
                return line.replace(/^(&gt;)\s+(.*?)$/, '<span class="md-blockquote">$1 $2</span>');
            }
            // Lists
            else if (line.match(/^\s*[-*+]\s+/) || line.match(/^\s*\d+\.\s+/)) {
                return line.replace(/^(\s*[-*+]|\s*\d+\.)\s+(.*)$/, '<span class="md-list">$1 $2</span>');
            }
            // horizontal rule
            /*else if (line=='---') {
                return '<hr/>';
            }*/
            // image
            else if (line.match(/\!\[(.*?)\]\((.*?)\)/)) {
                return line.replace(/\!\[(.*?)\]\((.*?)\)/, '<span class="md-image">![$1]($2)</span>');
            }
            // Regular line - process inline formatting
            else {
                return line
                    // Bold
                    .replace(/\*\*([^\*]+)\*\*/g, '<span class="md-bold">**$1**</span>')
                    .replace(/__([^_]+)__/g, '<span class="md-bold">__$1__</span>')
                    // Italic
                    .replace(/\*([^\*]+)\*/g, '<span class="md-italic">*$1*</span>')
                    .replace(/_([^_]+)_/g, '<span class="md-italic">_$1_</span>')
                    // Links
                    .replace(/\[(.*?)\]\((.*?)\)/g, '<span class="md-link">[$1]($2)</span>')
                    // Inline code
                    //.replace(/`([^`]+)`/g, '<span class="md-code">`$1`</span>')
                    // Table
                    .replace(/^(\|.*?\|)\n(.*?)\n\1/gm, '<span class="md-table">$1</span>\n<span class="md-table-row">$2</span>');
                    
            }
        });
        
        // Update the highlight div
        highlight.innerHTML = processedLines.join('\n');
    }
});
