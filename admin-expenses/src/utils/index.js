export const formatCurrency = (value) => {
  return value.toLocaleString("es-PE", { style: "currency", currency: "PEN" });
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
