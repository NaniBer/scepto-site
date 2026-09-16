import { useEffect, useState, useCallback } from "react";

const TABS = [
  { id: "contact", label: "Contact" },
  { id: "stats", label: "Stats" },
  { id: "partners", label: "Partners" },
  { id: "products", label: "Products" },
  { id: "departments", label: "Departments" },
  { id: "sectors", label: "Sectors" },
  { id: "general", label: "General" },
];

const API = "/api/content";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("contact");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin — Scepto Import PLC";
    const saved = sessionStorage.getItem("scepto_admin");
    if (saved) {
      setAuthed(true);
      setPassword(saved);
    }
  }, []);

  const loadData = useCallback(async (pw) => {
    setLoading(true);
    try {
      const resp = await fetch(API);
      if (!resp.ok) throw new Error("Failed to load");
      const json = await resp.json();
      setData(json);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed && !data) loadData(password);
  }, [authed, data, password, loadData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password) {
      sessionStorage.setItem("scepto_admin", password);
      setAuthed(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("scepto_admin");
    setAuthed(false);
    setPassword("");
    setData(null);
  };

  const save = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const resp = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(data),
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.error || "Save failed");
      setMsg({ type: "success", text: "Saved successfully" });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    }
    setSaving(false);
  };

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-6">
        <form onSubmit={handleLogin} className="card-dark p-8 w-full max-w-sm">
          <h1 className="font-display font-bold text-2xl text-ink mb-2">Admin</h1>
          <p className="text-sm text-mist font-light mb-6">
            Scepto Import PLC — content management
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-input-dark w-full mb-4"
            autoFocus
          />
          <button type="submit" className="btn-volt w-full">
            Login
          </button>
          {msg && (
            <p className={`text-sm mt-4 ${msg.type === "error" ? "text-red-400" : "text-volt"}`}>
              {msg.text}
            </p>
          )}
        </form>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <p className="text-mist font-light">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="border-b border-line sticky top-0 bg-bg/95 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-lg text-ink">Scepto Admin</h1>
            <p className="text-xs text-mist font-light">Content management</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="btn-volt text-sm px-4 py-2"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              onClick={handleLogout}
              className="btn-ghost text-sm px-4 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {msg && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm ${
              msg.type === "success"
                ? "bg-volt/10 border border-volt/40 text-volt"
                : "bg-red-500/10 border border-red-500/40 text-red-400"
            }`}
          >
            {msg.text}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                tab === t.id
                  ? "bg-volt text-inklight border-volt"
                  : "bg-transparent text-mist border-line hover:border-mist"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "contact" && <ContactEditor data={data.contact} onChange={(v) => update("contact", v)} />}
        {tab === "stats" && <ArrayEditor data={data.stats} onChange={(v) => update("stats", v)} fields={["num", "prefix", "suffix", "label"]} labels={["Number", "Prefix", "Suffix", "Label"]} title="Stats" />}
        {tab === "partners" && <ArrayEditor data={data.partners} onChange={(v) => update("partners", v)} fields={["name", "logo", "desc", "origin", "status", "featured"]} labels={["Name", "Logo path", "Description", "Origin", "Status", "Featured"]} title="Partners" />}
        {tab === "products" && <ArrayEditor data={data.products} onChange={(v) => update("products", v)} fields={["num", "domain", "title", "brand", "desc", "img", "featured"]} labels={["Number", "Domain", "Title", "Brand", "Description", "Image path", "Featured"]} title="Products" />}
        {tab === "departments" && <ArrayEditor data={data.departments} onChange={(v) => update("departments", v)} fields={["num", "name", "desc"]} labels={["Number", "Name", "Description"]} title="Departments" />}
        {tab === "sectors" && <ArrayEditor data={data.sectors} onChange={(v) => update("sectors", v)} fields={["sector", "desc", "tag"]} labels={["Sector", "Description", "Tag"]} title="Sectors" />}
        {tab === "general" && <GeneralEditor data={data} onChange={update} />}
      </div>
    </div>
  );
}

function ContactEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const fields = [
    { key: "office", label: "Office address" },
    { key: "showroom", label: "Showroom address" },
    { key: "shortCode", label: "Short code" },
    { key: "phone", label: "Phone (display)" },
    { key: "phoneHref", label: "Phone (href)" },
    { key: "showroomPhone", label: "Showroom phone (display)" },
    { key: "showroomPhoneHref", label: "Showroom phone (href)" },
    { key: "whatsapp", label: "WhatsApp (display)" },
    { key: "whatsappHref", label: "WhatsApp (href)" },
    { key: "email", label: "Email" },
    { key: "emailHref", label: "Email (href)" },
  ];
  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl text-ink">Contact Info</h2>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-xs uppercase tracking-[0.1em] text-mist mb-1.5">{f.label}</label>
          <input
            type="text"
            value={data[f.key] || ""}
            onChange={(e) => set(f.key, e.target.value)}
            className="form-input-dark w-full"
          />
        </div>
      ))}
    </div>
  );
}

function ArrayEditor({ data, onChange, fields, labels, title }) {
  const setItem = (idx, key, val) => {
    const next = [...data];
    next[idx] = { ...next[idx], [key]: val };
    onChange(next);
  };
  const removeItem = (idx) => {
    onChange(data.filter((_, i) => i !== idx));
  };
  const addItem = () => {
    const newItem = {};
    fields.forEach((f) => {
      if (f === "featured") newItem[f] = false;
      else if (f === "num") newItem[f] = String(data.length + 1).padStart(2, "0");
      else newItem[f] = "";
    });
    onChange([...data, newItem]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-ink">{title}</h2>
        <button onClick={addItem} className="btn-ghost text-sm px-3 py-1.5">+ Add</button>
      </div>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="card-dark p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-mist font-medium">#{idx + 1}</span>
              <button onClick={() => removeItem(idx)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {fields.map((f, fi) => (
                <div key={f} className={f === "desc" ? "sm:col-span-2" : ""}>
                  <label className="block text-xs uppercase tracking-[0.1em] text-mist mb-1">{labels[fi]}</label>
                  {f === "featured" ? (
                    <select
                      value={String(item[f] || false)}
                      onChange={(e) => setItem(idx, f, e.target.value === "true")}
                      className="form-input-dark w-full"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={item[f] || ""}
                      onChange={(e) => setItem(idx, f, e.target.value)}
                      className="form-input-dark w-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneralEditor({ data, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-xl text-ink">General Content</h2>
      <div>
        <label className="block text-xs uppercase tracking-[0.1em] text-mist mb-1.5">Blurb (home hero subtitle)</label>
        <textarea
          value={data.blurb || ""}
          onChange={(e) => onChange("blurb", e.target.value)}
          className="form-input-dark w-full min-h-[80px]"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.1em] text-mist mb-1.5">About motto</label>
        <input
          type="text"
          value={data.aboutMotto || ""}
          onChange={(e) => onChange("aboutMotto", e.target.value)}
          className="form-input-dark w-full"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.1em] text-mist mb-1.5">Video embed URL</label>
        <input
          type="text"
          value={data.videoEmbed || ""}
          onChange={(e) => onChange("videoEmbed", e.target.value)}
          className="form-input-dark w-full"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.1em] text-mist mb-1.5">About paragraphs (one per line)</label>
        <textarea
          value={(data.aboutParagraphs || []).join("\n")}
          onChange={(e) => onChange("aboutParagraphs", e.target.value.split("\n").filter(Boolean))}
          className="form-input-dark w-full min-h-[120px]"
        />
      </div>
    </div>
  );
}