export function getEmbeds(fields) {
  const embeds = [];
  for (let i = 0; i < fields.length; i += 25) {
    const chunk = fields.slice(i, i + 24);
    embeds.push({
      color: 3447003,
      title: "Search results",
      fields: chunk,
      timestamp: new Date(),
    });
  }
  return embeds;
}
