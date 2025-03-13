// src/utils/formatting.js

/**
 * Formata um valor monetário com duas casas decimais
 * @param {number} value - O valor a ser formatado
 * @param {number} decimals - Número de casas decimais (padrão: 2)
 * @returns {string} - Valor formatado como string
 */
export const formatCurrency = (value, decimals = 2) => {
  if (value === undefined || value === null) return "0.00";

  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Encurta um endereço Ethereum
 * @param {string} address - Endereço completo
 * @param {number} chars - Número de caracteres para mostrar no início e fim
 * @returns {string} - Endereço encurtado
 */
export const shortenAddress = (address, chars = 4) => {
  if (!address) return "";

  const start = address.substring(0, chars + 2); // +2 para incluir '0x'
  const end = address.substring(address.length - chars);

  return `${start}...${end}`;
};

/**
 * Calcula e formata o tempo relativo (ex: "2 dias atrás")
 * @param {Date|string|number} date - Data para comparar
 * @returns {string} - Texto formatado
 */
export const timeSince = (date) => {
  if (!date) return "";

  const now = new Date();
  const timeDate = new Date(date);
  const seconds = Math.floor((now.getTime() - timeDate.getTime()) / 1000);

  // Menos de 1 minuto
  if (seconds < 60) {
    return "agora mesmo";
  }

  // Menos de 1 hora
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minuto" : "minutos"} atrás`;
  }

  // Menos de 1 dia
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hora" : "horas"} atrás`;
  }

  // Menos de 1 mês
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} ${days === 1 ? "dia" : "dias"} atrás`;
  }

  // Menos de 1 ano
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? "mês" : "meses"} atrás`;
  }

  // 1 ano ou mais
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? "ano" : "anos"} atrás`;
};
