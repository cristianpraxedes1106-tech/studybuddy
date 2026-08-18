const Parser = {
  parseCards: (text, separator) => {
    const valid = [];
    const invalid = [];

    if (!text || !separator) return { valid, invalid };

    const lines = text.split('\n');

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return; // Ignora linhas vazias

      const sepIndex = trimmedLine.indexOf(separator);
      
      if (sepIndex === -1) {
        invalid.push({ line: index + 1, reason: 'Separador não encontrado' });
        return;
      }

      const front = trimmedLine.substring(0, sepIndex).trim();
      const back = trimmedLine.substring(sepIndex + separator.length).trim();

      if (!front || !back) {
        invalid.push({ line: index + 1, reason: 'Frente ou verso vazios' });
        return;
      }

      valid.push({ id: crypto.randomUUID(), front, back });
    });

    return { valid, invalid };
  }
};