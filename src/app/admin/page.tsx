"use client";

import { useEffect, useState, useCallback } from "react";

type ContentData = Record<string, unknown>;

export default function AdminPage() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

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
    setTimeout(() => setSaved(false), 2000);
  }, [content]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-bark-light">Loading...</p>
      </div>
    );
  }

  const tabs = ["site", "home", "about", "membership", "footer"];

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-forest text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Apple Hill Admin</h1>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sage-light text-sm">Saved!</span>
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
        <div className="flex gap-1 mb-8 bg-cream-dark rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-white text-forest shadow-sm"
                  : "text-bark-light hover:text-bark"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content editor */}
        <div className="space-y-6">
          <SectionEditor
            data={content[activeTab] as Record<string, unknown>}
            onChange={(updated) =>
              setContent({ ...content, [activeTab]: updated })
            }
            path={activeTab}
          />
        </div>
      </div>
    </div>
  );
}

function SectionEditor({
  data,
  onChange,
  path,
}: {
  data: unknown;
  onChange: (val: unknown) => void;
  path: string;
}) {
  if (data === null || data === undefined) return null;

  if (typeof data === "string") {
    const isLong = data.length > 80;
    return isLong ? (
      <textarea
        value={data}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full border border-sage/30 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 resize-y"
      />
    ) : (
      <input
        type="text"
        value={data}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-sage/30 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
      />
    );
  }

  if (typeof data === "number") {
    return (
      <input
        type="number"
        value={data}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border border-sage/30 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
      />
    );
  }

  if (typeof data === "boolean") {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={data}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-forest"
        />
        <span className="text-sm text-bark-light">{data ? "Yes" : "No"}</span>
      </label>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-sage/20 p-5">
            <p className="text-xs font-semibold text-sage uppercase tracking-wider mb-3">
              Item {i + 1}
            </p>
            <SectionEditor
              data={item}
              onChange={(val) => {
                const copy = [...data];
                copy[i] = val;
                onChange(copy);
              }}
              path={`${path}[${i}]`}
            />
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;
    return (
      <div className="space-y-5">
        {Object.entries(obj).map(([key, val]) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-forest mb-1.5 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <SectionEditor
              data={val}
              onChange={(updated) => onChange({ ...obj, [key]: updated })}
              path={`${path}.${key}`}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
