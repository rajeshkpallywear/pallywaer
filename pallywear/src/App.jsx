import { useState } from 'react'
import './App.css'

// ─── DATA IMPORTED FROM src/templete/index.json & src/config/settings_data.json ───

const THEME = {
  brand: 'Pallywear',
  accentColor: '#D4C4D9',
  primaryColor: '#1D1D1D',
  badgeColor: '#FFA680',
  freeShipping: 'FREE SHIPPING on all orders!',
  cartType: 'drawer',
}

// From index.json → collection_list blocks
const COLLECTIONS = [
  { slug: 'mens-comfort-polo',      label: "Men's Comfort Polo",     emoji: '👔', count: '24+' },
  { slug: 'womens-shirt',           label: "Women's Shirt",           emoji: '👚', count: '18+' },
  { slug: 'shirts',                 label: 'Shirts',                  emoji: '🧥', count: '32+' },
  { slug: 'womens-everyday-polo',   label: "Women's Everyday Polo",   emoji: '👗', count: '15+' },
  { slug: 'mens-hoodie',            label: "Men's Hoodie",            emoji: '🧤', count: '10+' },
  { slug: 'womens-hoodie',          label: "Women's Hoodie",          emoji: '🧣', count: '10+' },
  { slug: 'corporate-gifts',        label: 'Corporate Gifts',         emoji: '🎁', count: '20+' },
  { slug: 'bottles',                label: 'Bottles & Drinkware',     emoji: '🍶', count: '12+' },
  { slug: 'keychain',               label: 'Keychains',               emoji: '🔑', count: '8+'  },
]

// From index.json → promotion_cards blocks (Our Top Picks)
const TOP_PICKS = [
  { caption: 'Relax',    title: 'Comfort Polo',     slug: 'mens-comfort-polo',       emoji: '👔', tag: 'Bestseller' },
  { caption: 'Stay Warm',title: 'Sweat Shirt',       slug: 'mens-sweatshirt',         emoji: '🧥', tag: 'New' },
  { caption: 'Daily Wear',title: 'Everyday Polo',   slug: 'womens-everyday-polo',    emoji: '👗', tag: 'Sale' },
  { caption: 'Vibing',   title: 'Hoodie',            slug: 'mens-hoodie',             emoji: '🧤', tag: 'Hot' },
  { caption: 'Beast',    title: "Men's T-Shirt",     slug: 'mens-t-shirt',            emoji: '👕', tag: null },
  { caption: 'Casual',   title: "Women's T-Shirt",   slug: 'womens-t-shirts',         emoji: '💜', tag: 'New' },
]

// From index.json → multicolumn blocks (stats)
const STATS = [
  { value: '10,000+', label: 'Yearly Sales',         emoji: '📦' },
  { value: '2+',      label: 'Years on the Market',  emoji: '📅' },
  { value: '97%',     label: 'Returning Customers',  emoji: '🤝' },
]

// From index.json → events_calendar blocks (Fashion Drops)
const FASHION_DROPS = [
  {
    heading: 'Everyday Style, Effortlessly Cool',
    description: 'Discover polos that blend modern design with breathable comfort. Whether at work or on the move, wear confidence with Pallywear.',
    linkLabel: 'Explore Now',
    slug: 'mens-comfort-polo',
    emoji: '👔',
    bg: 'linear-gradient(135deg,#1D1D1D,#3E3E3E)',
  },
  {
    heading: 'Bold Looks. Bright Colors.',
    description: "Stand out with Pallywear's latest collection of graphic tees and statement styles. Built for those who love to express through fashion.",
    linkLabel: 'Explore Now',
    slug: 'sports-jersey',
    emoji: '⚽',
    bg: 'linear-gradient(135deg,#D4C4D9,#9b8fa4)',
  },
]

// From index.json → rich-text block
const BRAND_TAGLINE = {
  heading: 'Where Every Gift Tells a Story!',
  text: "From curated collections to heartfelt packaging, every Pallywear gift is a story in itself — crafted to create joy, inspire connection, and leave a lasting impression.",
}

// From index.json → image_banner block
const BANNER = {
  heading: 'Redefine Everyday Comfort',
  text: "Step into effortless style with Pallywear's signature collection. From workdays to weekends, our versatile outfits are crafted for comfort, confidence, and a modern look that fits every mood.",
  cta: 'Explore Now',
  slug: 'mens-comfort-polo',
}

// From index.json → image_with_text block (Drinkware)
const DRINKWARE = {
  caption: 'Hydrate in Style',
  heading: "Drinkware You'll Love To Gift",
  text: "Discover Pallywear's signature collection of flasks, and bottles, crafted for utility, styled for sophistication. The perfect pick for gifting or upgrading your own shelf.",
}

// From index.json → image_hotspots (Corporate Gifts)
const CORPORATE = {
  heading: 'CORPORATE GIFTS',
  caption: 'PALLYWEAR',
  tooltips: [
    'Carry your brand everywhere with PallyWear Premium Custom Keychains — durable, elegant, fully customizable.',
    'Perfect for Personal or Corporate Use — Gifts, branding, giveaways, retail.',
    'Elevate your brand with premium, customised corporate gift sets — bottles, accessories & more.',
  ],
}

// From config/settings_data.json → footer sections
const FOOTER_COLS = [
  { heading: 'Quick Links', links: ["Men's Polo", "Women's Polo", 'Hoodies', 'T-Shirts', 'Corporate Gifts'] },
  { heading: 'Info',        links: ['About Us', 'Bulk Orders', 'Shipping Policy', 'Refund Policy', 'Terms of Use'] },
  { heading: 'Our Mission', links: [], text: "Share comfort, quality, and style with everyone. Pallywear is crafted for everyday life." },
]

const MARQUEE_ITEMS = [
  THEME.freeShipping,
  'New Arrivals Weekly',
  'Premium Cotton Fabric',
  'Custom Corporate Gifts',
  '97% Returning Customers',
  '10,000+ Happy Customers',
]

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      🎉 Welcome to <strong>Pallywear</strong>
      <span>|</span>
      {THEME.freeShipping}
      <span>|</span>
      Use code <strong>PALLY10</strong> for 10% off
    </div>
  )
}

function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <a href="#" className="nav-logo">
        PALLY<span>WEAR</span>
      </a>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#collections">Collections</a></li>
        <li><a href="#top-picks">Our Top Picks</a></li>
        <li><a href="#corporate">Corporate Gifts</a></li>
        <li><a href="#drops">Fashion Drops</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <div className="nav-actions">
        <button className="nav-icon-btn" aria-label="Search">🔍</button>
        <button className="nav-icon-btn" aria-label="Wishlist">🤍</button>
        <button className="nav-icon-btn" onClick={onCartClick} aria-label="Cart" style={{ position: 'relative' }}>
          🛒
          <span className="cart-badge">{cartCount}</span>
        </button>
        <button className="nav-icon-btn" aria-label="Account">👤</button>
      </div>
    </nav>
  )
}

function HeroBanner() {
  return (
    <section className="hero-section">
      <div className="hero-bg-circle c1" />
      <div className="hero-bg-circle c2" />
      <div className="hero-content">
        <div className="hero-badge">✨ {BANNER.heading}</div>
        <h1 className="hero-title">
          Dress Up.<br />
          Stand <span>Out.</span><br />
          Feel Good.
        </h1>
        <p className="hero-subtitle">{BANNER.text}</p>
        <div className="hero-actions">
          <a href="#collections" className="btn-primary">{BANNER.cta} →</a>
          <a href="#top-picks" className="btn-outline">Our Top Picks</a>
        </div>
        <div className="hero-stats">
          {STATS.map((s, i) => (
            <div key={i}>
              <div className="hero-stat-num">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MarqueeBar() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee-bar" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  )
}

function FeaturesBar() {
  const features = [
    { icon: '🚚', title: 'Free Delivery',    desc: 'On all orders' },
    { icon: '↩️', title: 'Easy Returns',     desc: '30-day return policy' },
    { icon: '🔒', title: 'Secure Payments',  desc: '100% safe & encrypted' },
    { icon: '🎁', title: 'Corporate Gifting', desc: 'Bulk & custom orders' },
  ]
  return (
    <div className="features-bar">
      {features.map((f, i) => (
        <div key={i} className="feature-item">
          <span className="feature-icon">{f.icon}</span>
          <div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CollectionsSection() {
  return (
    <section id="collections" className="section" style={{ background: '#fff' }}>
      <div className="section-header">
        <div className="section-eyebrow">Browse</div>
        <h2 className="section-title">Browse Collections</h2>
        <p className="section-subtitle">Find your perfect style across our curated categories</p>
      </div>
      <div className="collections-grid">
        {COLLECTIONS.map((col, i) => (
          <div key={i} className={`collection-chip cat-bg-${(i % 4) + 1}`}>
            <span className="chip-emoji">{col.emoji}</span>
            <div>
              <div className="chip-label">{col.label}</div>
              <div className="chip-count">{col.count} items</div>
            </div>
            <span className="chip-arrow">→</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function TopPicksSection({ onAddToCart }) {
  return (
    <section id="top-picks" className="section">
      <div className="section-header">
        <div className="section-eyebrow">Featured</div>
        <h2 className="section-title">Our Top Picks</h2>
        <p className="section-subtitle">Our most-loved styles, hand-picked for you</p>
      </div>
      <div className="top-picks-grid">
        {TOP_PICKS.map((p, i) => (
          <div key={i} className="pick-card">
            <div className={`pick-img cat-bg-${(i % 4) + 1}`}>
              <span style={{ fontSize: 72 }}>{p.emoji}</span>
              {p.tag && (
                <span className={`product-badge${p.tag === 'New' ? ' new' : ''}`}>{p.tag}</span>
              )}
            </div>
            <div className="pick-body">
              <div className="product-brand">Pallywear</div>
              <div className="pick-caption">{p.caption}</div>
              <div className="pick-title">{p.title}</div>
              <button className="product-add-btn" onClick={onAddToCart}>
                Shop Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function BrandTaglineSection() {
  return (
    <section className="tagline-section">
      <div className="tagline-inner">
        <h2 className="tagline-heading"><em>{BRAND_TAGLINE.heading}</em></h2>
        <p className="tagline-text">{BRAND_TAGLINE.text}</p>
      </div>
    </section>
  )
}

function DrinkwareSection() {
  return (
    <section className="two-col-section" style={{ background: '#fff' }}>
      <div className="two-col-img cat-bg-3" style={{ fontSize: 120 }}>🍶</div>
      <div className="two-col-body">
        <div className="section-eyebrow">{DRINKWARE.caption}</div>
        <h2 className="section-title" style={{ textAlign: 'left', fontSize: 30 }}>{DRINKWARE.heading}</h2>
        <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 28 }}>{DRINKWARE.text}</p>
        <a href="#collections" className="btn-primary">Shop Drinkware →</a>
      </div>
    </section>
  )
}

function CorporateSection() {
  return (
    <section id="corporate" className="corporate-section">
      <div className="corporate-inner">
        <div className="corporate-img">
          <div style={{ fontSize: 100, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            🎁🏆📒🖊️🔑
          </div>
        </div>
        <div className="corporate-body">
          <div className="section-eyebrow">{CORPORATE.caption}</div>
          <h2 className="section-title" style={{ textAlign: 'left', fontSize: 30 }}>{CORPORATE.heading}</h2>
          <div className="corporate-tooltips">
            {CORPORATE.tooltips.map((tip, i) => (
              <div key={i} className="corporate-tip">
                <span>💡</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
          <a href="#collections" className="btn-primary" style={{ marginTop: 24 }}>
            Explore Corporate Gifts →
          </a>
        </div>
      </div>
    </section>
  )
}

function FashionDropsSection() {
  return (
    <section id="drops" className="section">
      <div className="section-header">
        <div className="section-eyebrow">Latest</div>
        <h2 className="section-title">Fashion. Fun. Fresh Drops</h2>
      </div>
      <div className="drops-grid">
        {FASHION_DROPS.map((drop, i) => (
          <div key={i} className="drop-card" style={{ background: drop.bg }}>
            <div className="drop-emoji">{drop.emoji}</div>
            <h3 className="drop-heading">{drop.heading}</h3>
            <p className="drop-desc">{drop.description}</p>
            <button className="promo-btn">{drop.linkLabel} →</button>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <div className="stats-bar">
      {STATS.map((s, i) => (
        <div key={i} className="stat-item">
          <div className="stat-emoji">{s.emoji}</div>
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="section-header" style={{ marginBottom: 0 }}>
        <div className="section-eyebrow" style={{ color: '#FFA680' }}>Stay in the Loop</div>
        <h2 className="section-title">Get Exclusive Deals</h2>
        <p className="section-subtitle">Subscribe for early access to new collections, style tips, and members-only discounts.</p>
      </div>
      <form className="newsletter-form" onSubmit={e => { e.preventDefault(); alert('Thanks for subscribing! 🎉') }}>
        <input className="newsletter-input" type="email" placeholder="Enter your email address..." required />
        <button className="newsletter-btn" type="submit">Subscribe</button>
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">PALLY<span>WEAR</span></div>
          <p className="footer-desc">Premium cotton clothing brand crafted for everyday comfort and style. Made with care, worn with pride.</p>
          <div className="footer-socials">
            {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
              <button key={i} className="social-btn">{icon}</button>
            ))}
          </div>
        </div>
        {FOOTER_COLS.map((col, i) => (
          <div key={i}>
            <div className="footer-col-title">{col.heading}</div>
            {col.text ? (
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7 }}>{col.text}</p>
            ) : (
              <ul className="footer-links">
                {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2025 Pallywear. All rights reserved.</span>
        <div className="footer-payments">
          {['VISA', 'MC', 'UPI', 'COD'].map(p => (
            <span key={p} className="payment-pill">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── CART DRAWER ────────────────────────────────────────────────────────────────
function CartDrawer({ open, onClose, items }) {
  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-drawer${open ? ' open' : ''}`}>
        <div className="cart-drawer-header">
          <span>🛒 Your Cart ({items.length})</span>
          <button onClick={onClose} className="cart-close">✕</button>
        </div>
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div style={{ fontSize: 60 }}>🛍️</div>
              <p>Your cart is empty</p>
              <a href="#top-picks" className="btn-primary" onClick={onClose}>Start Shopping</a>
            </div>
          ) : (
            items.map((item, i) => (
              <div key={i} className="cart-item">
                <div className="cart-item-img">{item.emoji}</div>
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total">
              Total: <strong>₹{items.reduce((a, b) => a + b.price, 0).toLocaleString()}</strong>
            </div>
            <button className="btn-primary" style={{ width: '100%' }}>Checkout →</button>
          </div>
        )}
      </div>
    </>
  )
}

// ─── APP ────────────────────────────────────────────────────────────────────────
function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const handleAddToCart = (item = { name: 'Pallywear Item', price: 799, emoji: '👕' }) => {
    setCartItems(prev => [...prev, item])
    setCartOpen(true)
  }

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: '#fafafa', minWidth: 0 }}>
      <AnnouncementBar />
      <Navbar cartCount={cartItems.length} onCartClick={() => setCartOpen(true)} />
      <HeroBanner />
      <MarqueeBar />
      <FeaturesBar />
      <CollectionsSection />
      <TopPicksSection onAddToCart={() => handleAddToCart()} />
      <BrandTaglineSection />
      <DrinkwareSection />
      <CorporateSection />
      <FashionDropsSection />
      <StatsSection />
      <NewsletterSection />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} />
    </div>
  )
}

export default App
