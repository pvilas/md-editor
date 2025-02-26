document.addEventListener('DOMContentLoaded', function() {
    // Initialize all markdown editors
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
        editor.addEventListener('input', () => updateHighlighting(editor, highlight));
        
        // Initial highlighting
        updateHighlighting(editor, highlight);
        
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
    });
    
    function updateHighlighting(editor, highlight) {
        let text = editor.value;
        
        // Escape HTML to prevent XSS
        text = text.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');
        
        // Split the text into segments (code blocks and non-code blocks)
        const segments = [];
        let currentPos = 0;
        const codeBlockRegex = /```(?:\w*\n|\n)([\s\S]*?)```/g;
        
        let match;
        while ((match = codeBlockRegex.exec(text)) !== null) {
            // Add text before the code block
            if (match.index > currentPos) {
                segments.push({
                    type: 'text',
                    content: text.substring(currentPos, match.index)
                });
            }
            
            // Add the code block
            segments.push({
                type: 'code-block',
                content: match[0]
            });
            
            currentPos = match.index + match[0].length;
        }
        
        // Add any remaining text
        if (currentPos < text.length) {
            segments.push({
                type: 'text',
                content: text.substring(currentPos)
            });
        }
        
        // Process each segment
        const processedSegments = segments.map(segment => {
            if (segment.type === 'code-block') {
                // Wrap the entire code block in a span
                return '<span class="md-code-block">' + segment.content + '</span>';
            } else {
                // Process regular text line by line
                const lines = segment.content.split('\n');
                const processedLines = lines.map(line => {
                    // Headers
                    if (line.match(/^#{1,6}\s+/)) {
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
                            .replace(/`([^`]+)`/g, '<span class="md-code">`$1`</span>');
                    }
                });
                return processedLines.join('\n');
            }
        });
        
        // Update the highlight div
        highlight.innerHTML = processedSegments.join('');
    }
});