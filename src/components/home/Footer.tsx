const Footer = () => {
  return (
    <footer className="mt-10 border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="text-foreground font-semibold mb-2">KMRL</div>
          <div className="text-sm text-muted-foreground">Metro AI Platform prototype inspired by kochimetro.org.</div>
        </div>
        <div>
          <div className="text-foreground font-semibold mb-2">Explore</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><a href="#" className="hover:underline">Dashboard</a></li>
            <li><a href="#" className="hover:underline">AI Core</a></li>
            <li><a href="#" className="hover:underline">Stations</a></li>
          </ul>
        </div>
        <div>
          <div className="text-foreground font-semibold mb-2">Customer</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><a href="#" className="hover:underline">Fares</a></li>
            <li><a href="#" className="hover:underline">Timings</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>
        <div>
          <div className="text-foreground font-semibold mb-2">Connect</div>
          <div className="text-sm text-muted-foreground">Kochi Metro Rail Limited</div>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} KMRL Prototype</div>
    </footer>
  );
};

export default Footer;


