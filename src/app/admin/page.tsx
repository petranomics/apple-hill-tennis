"use client";

import { useEffect, useState, useCallback } from "react";

/* ──────────────────── Types ──────────────────── */

interface Highlight {
  title: string;
  description: string;
  icon: string;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

interface Contact {
  name: string;
  role: string;
  email: string;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  content: string;
}

interface ContentData {
  site: { name: string; tagline: string };
  home: {
    hero: { heading: string; subheading: string; description: string; image: string };
    welcome: { heading: string; text: string; image: string };
    highlights: Highlight[];
  };
  about: {
    hero: { heading: string; image: string };
    history: { heading: string; text: string; image: string };
    facilities: { heading: string; text: string; image: string };
    season: { heading: string; text: string };
    location: {
      heading: string;
      address: string;
      description: string;
      mapUrl: string;
      coordinates: { lat: number; lng: number };
    };
  };
  membership: {
    hero: { heading: string; description: string; image: string };
    plans: Plan[];
    guestFee: { price: string; description: string };
    contact: { heading: string; text: string; contacts: Contact[] };
  };
  blog: { title: string; description: string; posts: BlogPost[] };
  footer: { email: string; location: string; tagline: string };
}

/* ──────────────────── Password Gate ──────────────────── */

const ADMIN_PASS = "applehill2026";

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASS) {
      sessionStorage.setItem("ahtc-admin", "1");
      onAuth();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-forest mb-6 text-center">Admin Login</h1>
        <input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          placeholder="Enter password"
          className="w-full border border-sage/30 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 mb-4"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm mb-3">Incorrect password</p>}
        <button className="w-full bg-forest hover:bg-forest-light text-white py-3 rounded-lg font-semibold transition-colors">
          Sign In
        </button>
      </form>
    </div>
  );
}

/* ──────────────────── Reusable Field Components ──────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-forest mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-sage/30 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
    />
  );
}

function TextArea({ value, onChange, rows = 4 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full border border-sage/30 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 resize-y"
    />
  );
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/example.jpg"
        className="w-full border border-sage/30 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
      />
      {value && (
        <div className="bg-sage/10 rounded-lg p-2 inline-block">
          <img
            src={value}
            alt="Preview"
            className="rounded-md max-h-40 object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-sage/20 p-6 space-y-4">
      <h3 className="text-lg font-bold text-forest">{title}</h3>
      {children}
    </div>
  );
}

/* ──────────────────── Section Editors ──────────────────── */

function SiteEditor({ data, set }: { data: ContentData["site"]; set: (d: ContentData["site"]) => void }) {
  return (
    <Card title="Site Info">
      <Field label="Site Name">
        <TextInput value={data.name} onChange={(v) => set({ ...data, name: v })} />
      </Field>
      <Field label="Tagline">
        <TextInput value={data.tagline} onChange={(v) => set({ ...data, tagline: v })} />
      </Field>
    </Card>
  );
}

function HomeEditor({ data, set }: { data: ContentData["home"]; set: (d: ContentData["home"]) => void }) {
  const setHero = (hero: ContentData["home"]["hero"]) => set({ ...data, hero });
  const setWelcome = (welcome: ContentData["home"]["welcome"]) => set({ ...data, welcome });

  return (
    <div className="space-y-6">
      <Card title="Hero Banner">
        <Field label="Heading"><TextInput value={data.hero.heading} onChange={(v) => setHero({ ...data.hero, heading: v })} /></Field>
        <Field label="Subheading"><TextInput value={data.hero.subheading} onChange={(v) => setHero({ ...data.hero, subheading: v })} /></Field>
        <Field label="Description"><TextArea value={data.hero.description} onChange={(v) => setHero({ ...data.hero, description: v })} rows={3} /></Field>
        <Field label="Background Image"><ImageField value={data.hero.image} onChange={(v) => setHero({ ...data.hero, image: v })} /></Field>
      </Card>

      <Card title="Welcome Section">
        <Field label="Heading"><TextInput value={data.welcome.heading} onChange={(v) => setWelcome({ ...data.welcome, heading: v })} /></Field>
        <Field label="Text"><TextArea value={data.welcome.text} onChange={(v) => setWelcome({ ...data.welcome, text: v })} /></Field>
        <Field label="Image"><ImageField value={data.welcome.image} onChange={(v) => setWelcome({ ...data.welcome, image: v })} /></Field>
      </Card>

      <Card title="Highlights">
        {data.highlights.map((h, i) => (
          <div key={i} className="bg-cream rounded-lg p-4 space-y-3">
            <p className="text-xs font-semibold text-sage uppercase tracking-wider">Highlight {i + 1}</p>
            <Field label="Title"><TextInput value={h.title} onChange={(v) => {
              const arr = [...data.highlights]; arr[i] = { ...h, title: v }; set({ ...data, highlights: arr });
            }} /></Field>
            <Field label="Description"><TextArea value={h.description} onChange={(v) => {
              const arr = [...data.highlights]; arr[i] = { ...h, description: v }; set({ ...data, highlights: arr });
            }} rows={2} /></Field>
            <Field label="Icon (court, calendar, community)"><TextInput value={h.icon} onChange={(v) => {
              const arr = [...data.highlights]; arr[i] = { ...h, icon: v }; set({ ...data, highlights: arr });
            }} /></Field>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AboutEditor({ data, set }: { data: ContentData["about"]; set: (d: ContentData["about"]) => void }) {
  return (
    <div className="space-y-6">
      <Card title="Hero">
        <Field label="Heading"><TextInput value={data.hero.heading} onChange={(v) => set({ ...data, hero: { ...data.hero, heading: v } })} /></Field>
        <Field label="Image"><ImageField value={data.hero.image} onChange={(v) => set({ ...data, hero: { ...data.hero, image: v } })} /></Field>
      </Card>

      <Card title="Our Story">
        <Field label="Heading"><TextInput value={data.history.heading} onChange={(v) => set({ ...data, history: { ...data.history, heading: v } })} /></Field>
        <Field label="Text"><TextArea value={data.history.text} onChange={(v) => set({ ...data, history: { ...data.history, text: v } })} rows={5} /></Field>
        <Field label="Image"><ImageField value={data.history.image} onChange={(v) => set({ ...data, history: { ...data.history, image: v } })} /></Field>
      </Card>

      <Card title="Facilities">
        <Field label="Heading"><TextInput value={data.facilities.heading} onChange={(v) => set({ ...data, facilities: { ...data.facilities, heading: v } })} /></Field>
        <Field label="Text"><TextArea value={data.facilities.text} onChange={(v) => set({ ...data, facilities: { ...data.facilities, text: v } })} rows={5} /></Field>
        <Field label="Image"><ImageField value={data.facilities.image} onChange={(v) => set({ ...data, facilities: { ...data.facilities, image: v } })} /></Field>
      </Card>

      <Card title="Playing Season">
        <Field label="Heading"><TextInput value={data.season.heading} onChange={(v) => set({ ...data, season: { ...data.season, heading: v } })} /></Field>
        <Field label="Text"><TextArea value={data.season.text} onChange={(v) => set({ ...data, season: { ...data.season, text: v } })} rows={4} /></Field>
      </Card>

      <Card title="Location">
        <Field label="Heading"><TextInput value={data.location.heading} onChange={(v) => set({ ...data, location: { ...data.location, heading: v } })} /></Field>
        <Field label="Address"><TextInput value={data.location.address} onChange={(v) => set({ ...data, location: { ...data.location, address: v } })} /></Field>
        <Field label="Description"><TextArea value={data.location.description} onChange={(v) => set({ ...data, location: { ...data.location, description: v } })} rows={2} /></Field>
        <Field label="Google Maps Link"><TextInput value={data.location.mapUrl} onChange={(v) => set({ ...data, location: { ...data.location, mapUrl: v } })} /></Field>
      </Card>
    </div>
  );
}

function MembershipEditor({ data, set }: { data: ContentData["membership"]; set: (d: ContentData["membership"]) => void }) {
  const updatePlan = (i: number, plan: Plan) => {
    const plans = [...data.plans];
    plans[i] = plan;
    set({ ...data, plans });
  };

  const updateContact = (i: number, contact: Contact) => {
    const contacts = [...data.contact.contacts];
    contacts[i] = contact;
    set({ ...data, contact: { ...data.contact, contacts } });
  };

  return (
    <div className="space-y-6">
      <Card title="Hero">
        <Field label="Heading"><TextInput value={data.hero.heading} onChange={(v) => set({ ...data, hero: { ...data.hero, heading: v } })} /></Field>
        <Field label="Description"><TextArea value={data.hero.description} onChange={(v) => set({ ...data, hero: { ...data.hero, description: v } })} rows={2} /></Field>
        <Field label="Image"><ImageField value={data.hero.image} onChange={(v) => set({ ...data, hero: { ...data.hero, image: v } })} /></Field>
      </Card>

      <Card title="Membership Plans">
        {data.plans.map((plan, i) => (
          <div key={i} className="bg-cream rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-sage uppercase tracking-wider">Plan {i + 1}</p>
              <label className="flex items-center gap-2 text-xs text-bark-light cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!plan.popular}
                  onChange={(e) => updatePlan(i, { ...plan, popular: e.target.checked })}
                  className="accent-forest"
                />
                Popular badge
              </label>
            </div>
            <Field label="Name"><TextInput value={plan.name} onChange={(v) => updatePlan(i, { ...plan, name: v })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Price"><TextInput value={plan.price} onChange={(v) => updatePlan(i, { ...plan, price: v })} /></Field>
              <Field label="Period"><TextInput value={plan.period} onChange={(v) => updatePlan(i, { ...plan, period: v })} /></Field>
            </div>
            <Field label="Features (one per line)">
              <TextArea
                value={plan.features.join("\n")}
                onChange={(v) => updatePlan(i, { ...plan, features: v.split("\n").filter(Boolean) })}
                rows={plan.features.length + 1}
              />
            </Field>
          </div>
        ))}
      </Card>

      <Card title="Guest Fee">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Price"><TextInput value={data.guestFee.price} onChange={(v) => set({ ...data, guestFee: { ...data.guestFee, price: v } })} /></Field>
          <Field label="Description"><TextInput value={data.guestFee.description} onChange={(v) => set({ ...data, guestFee: { ...data.guestFee, description: v } })} /></Field>
        </div>
      </Card>

      <Card title="Contact Section">
        <Field label="Heading"><TextInput value={data.contact.heading} onChange={(v) => set({ ...data, contact: { ...data.contact, heading: v } })} /></Field>
        <Field label="Text"><TextArea value={data.contact.text} onChange={(v) => set({ ...data, contact: { ...data.contact, text: v } })} rows={2} /></Field>
        {data.contact.contacts.map((c, i) => (
          <div key={i} className="bg-cream rounded-lg p-4 space-y-3">
            <p className="text-xs font-semibold text-sage uppercase tracking-wider">Contact {i + 1}</p>
            <Field label="Name"><TextInput value={c.name} onChange={(v) => updateContact(i, { ...c, name: v })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Role"><TextInput value={c.role} onChange={(v) => updateContact(i, { ...c, role: v })} /></Field>
              <Field label="Email"><TextInput value={c.email} onChange={(v) => updateContact(i, { ...c, email: v })} /></Field>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function FooterEditor({ data, set }: { data: ContentData["footer"]; set: (d: ContentData["footer"]) => void }) {
  return (
    <Card title="Footer">
      <Field label="Email"><TextInput value={data.email} onChange={(v) => set({ ...data, email: v })} /></Field>
      <Field label="Location"><TextInput value={data.location} onChange={(v) => set({ ...data, location: v })} /></Field>
      <Field label="Tagline"><TextArea value={data.tagline} onChange={(v) => set({ ...data, tagline: v })} rows={2} /></Field>
    </Card>
  );
}

/* ──────────────────── Blog Editor ──────────────────── */

function BlogEditor({ data, set }: { data: ContentData["blog"]; set: (d: ContentData["blog"]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const updatePost = (i: number, post: BlogPost) => {
    const posts = [...data.posts];
    posts[i] = post;
    set({ ...data, posts });
  };

  const addPost = () => {
    const today = new Date().toISOString().split("T")[0];
    const newPost: BlogPost = {
      slug: "",
      title: "",
      excerpt: "",
      date: today,
      author: "Apple Hill Tennis Club",
      image: "",
      tags: [],
      content: "",
    };
    set({ ...data, posts: [newPost, ...data.posts] });
    setEditingIndex(0);
  };

  const deletePost = (i: number) => {
    if (!confirm("Delete this post?")) return;
    const posts = data.posts.filter((_, idx) => idx !== i);
    set({ ...data, posts });
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <Card title="Blog Settings">
        <Field label="Blog Page Title"><TextInput value={data.title} onChange={(v) => set({ ...data, title: v })} /></Field>
        <Field label="Blog Description (SEO)"><TextArea value={data.description} onChange={(v) => set({ ...data, description: v })} rows={2} /></Field>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-forest">Posts ({data.posts.length})</h3>
        <button onClick={addPost} className="bg-forest hover:bg-forest-light text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + New Post
        </button>
      </div>

      {data.posts.map((post, i) => (
        <div key={i} className="bg-white rounded-xl border border-sage/20 overflow-hidden">
          {/* Post header — always visible */}
          <button
            onClick={() => setEditingIndex(editingIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-cream/50 transition-colors"
          >
            <div className="min-w-0">
              <p className="font-semibold text-forest truncate">{post.title || "(Untitled post)"}</p>
              <p className="text-xs text-bark-light mt-1">{post.date}</p>
            </div>
            <svg
              className={`w-5 h-5 text-sage flex-shrink-0 transition-transform ${editingIndex === i ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expanded editor */}
          {editingIndex === i && (
            <div className="border-t border-sage/20 p-5 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Title"><TextInput value={post.title} onChange={(v) => updatePost(i, { ...post, title: v })} /></Field>
                <Field label="URL Slug"><TextInput value={post.slug} onChange={(v) => updatePost(i, { ...post, slug: v })} /></Field>
              </div>
              <Field label="Excerpt"><TextArea value={post.excerpt} onChange={(v) => updatePost(i, { ...post, excerpt: v })} rows={2} /></Field>
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="Date"><TextInput value={post.date} onChange={(v) => updatePost(i, { ...post, date: v })} /></Field>
                <Field label="Author"><TextInput value={post.author} onChange={(v) => updatePost(i, { ...post, author: v })} /></Field>
                <Field label="Tags (comma separated)">
                  <TextInput
                    value={post.tags.join(", ")}
                    onChange={(v) => updatePost(i, { ...post, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })}
                  />
                </Field>
              </div>
              <Field label="Featured Image"><ImageField value={post.image} onChange={(v) => updatePost(i, { ...post, image: v })} /></Field>
              <Field label="Content (Markdown)">
                <TextArea value={post.content} onChange={(v) => updatePost(i, { ...post, content: v })} rows={16} />
              </Field>
              <div className="flex justify-end">
                <button
                  onClick={() => deletePost(i)}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors"
                >
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────── Main Admin Page ──────────────────── */

const TABS = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "membership", label: "Membership" },
  { key: "blog", label: "Blog" },
  { key: "site", label: "Site" },
  { key: "footer", label: "Footer" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ahtc-admin") === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, [authed]);

  const save = useCallback(async () => {
    if (!content) return;
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [content]);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse text-bark-light">Loading content...</div>
      </div>
    );
  }

  const setSection = <K extends keyof ContentData>(key: K) => (val: ContentData[K]) =>
    setContent({ ...content, [key]: val });

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="bg-forest text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <h1 className="text-lg font-bold tracking-wide flex items-center gap-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3c0 9-6 9-6 18" />
            <path d="M12 3c0 9 6 9 6 18" />
            <line x1="3.5" y1="10" x2="20.5" y2="10" />
          </svg>
          Apple Hill Admin
        </h1>
        <div className="flex items-center gap-4">
          {saved && (
            <span className="text-sage-light text-sm font-medium animate-pulse">Saved!</span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="bg-clay hover:bg-clay-light disabled:opacity-50 text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <a href="/" className="text-sage-light hover:text-white text-sm transition-colors">
            View Site &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-cream-dark rounded-lg p-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-white text-forest shadow-sm"
                  : "text-bark-light hover:text-bark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section editors */}
        <div className="space-y-6">
          {activeTab === "site" && <SiteEditor data={content.site} set={setSection("site")} />}
          {activeTab === "home" && <HomeEditor data={content.home} set={setSection("home")} />}
          {activeTab === "about" && <AboutEditor data={content.about} set={setSection("about")} />}
          {activeTab === "membership" && <MembershipEditor data={content.membership} set={setSection("membership")} />}
          {activeTab === "blog" && <BlogEditor data={content.blog} set={setSection("blog")} />}
          {activeTab === "footer" && <FooterEditor data={content.footer} set={setSection("footer")} />}
        </div>
      </div>
    </div>
  );
}
