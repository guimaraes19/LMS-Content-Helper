document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do HTML
    const editor = document.getElementById('editor');
    const boldBtn = document.getElementById('boldBtn');
    const h1Btn = document.getElementById('h1Btn');
    const ulBtn = document.getElementById('ulBtn');
    const codeBtn = document.getElementById('codeBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Função para aplicar formatação de texto
    function applyFormat(startTag, endTag = '') {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const selectedText = editor.value.substring(start, end);

        if (selectedText) {
            const formattedText = startTag + selectedText + endTag;
            const newText = editor.value.substring(0, start) + formattedText + editor.value.substring(end);
            editor.value = newText;
            editor.focus();
            // Move o cursor para o final do texto formatado
            editor.selectionEnd = start + formattedText.length;
        }
    }

    // Adiciona "ouvintes de eventos" aos botões
    boldBtn.addEventListener('click', () => {
        applyFormat('<b>', '</b>');
    });

    h1Btn.addEventListener('click', () => {
        applyFormat('<h1>', '</h1>');
    });

    ulBtn.addEventListener('click', () => {
        // Lógica para listas (bullet points)
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const selectedText = editor.value.substring(start, end);
        const listItems = selectedText.split('\n').map(item => `<li>${item.trim()}</li>`).join('\n');
        
        if (selectedText) {
            const formattedList = `<ul>\n${listItems}\n</ul>`;
            const newText = editor.value.substring(0, start) + formattedList + editor.value.substring(end);
            editor.value = newText;
            editor.focus();
        }
    });

    codeBtn.addEventListener('click', () => {
        applyFormat('<code>', '</code>');
    });

    // Função para copiar o conteúdo para a área de transferência
    copyBtn.addEventListener('click', () => {
        editor.select();
        document.execCommand('copy');
        alert('Conteúdo copiado para a área de transferência!');
    });
});