const articles = [
  { title: "KMRL achieves record ridership", link: "#", tag: "Update" },
  { title: "New station amenities rollout", link: "#", tag: "Notice" },
  { title: "Sustainability initiatives 2025", link: "#", tag: "Press" }
];

const NewsHighlights = () => {
  return (
    <section className="container mx-auto px-6 py-6">
      <div className="glass rounded-xl p-6 shadow-metro">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">News & Highlights</h2>
          <a href="#" className="text-sm text-metro-cyan hover:underline">All News</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((a) => (
            <a key={a.title} href={a.link} className="block rounded-lg border border-border/50 bg-card/60 p-4 hover:shadow-lg transition">
              <div className="text-xs text-muted-foreground mb-1">{a.tag}</div>
              <div className="text-foreground font-medium">{a.title}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsHighlights;


