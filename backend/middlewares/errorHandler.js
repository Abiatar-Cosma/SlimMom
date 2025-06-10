export const errorHandler = (err, req, res, next) => {
  console.error("❌ Eroare:", err.message);
  const status = err.status || 500;
  res
    .status(status)
    .json({ message: err.message || "Eroare internă de server" });
};
