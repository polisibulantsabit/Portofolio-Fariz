(function () {
    const cfg = window.SUPABASE_CONFIG || {};
    const configured = Boolean(cfg.url && cfg.anonKey && !/YOUR_|CHANGE_ME/i.test(cfg.url));
    const client = configured && window.supabase
        ? window.supabase.createClient(cfg.url, cfg.anonKey, { auth: { persistSession: false } })
        : null;

    if (!client) console.warn('[contact] Supabase belum dikonfigurasi di js/supabase-config.js');

    window.saveContact = async function (data) {
        if (!client) return 'skipped';
        try {
            const { error } = await client.from(cfg.table || 'contacts').insert({
                name: data.name || null,
                email: data.email || null,
                subject: data.subject || null,
                service: data.service || null,
                budget: data.budget || null,
                message: data.message || null
            });
            if (error) {
                console.error('[contact] Supabase insert gagal:', error.message);
                return 'error';
            }
            return 'saved';
        } catch (err) {
            console.error('[contact] Supabase error:', err);
            return 'error';
        }
    };
})();
