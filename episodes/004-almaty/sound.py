"""Звук выпуска 004 — Алматы: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: Зелёный базар, яблоко влетает, ДНК-спираль, укус → портал
        ('whip_whoosh', 0.0, 0), ('stamp_thud', e('hk_catch'), -2), ('shimmer', e('hk_genes'), -4), ('teleport_pop', e('hk_genes', 0.6), -6),
        ('apple_crunch', e('hk_bite'), 2), ('watch_click', e('hk_bite', 0.2), -2), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # до людей: медведь и яблоня
        ('dust_whoosh', S0['bears'] - 0.1, -2), ('bear_growl', e('br_bears', -0.1), -2), ('wood_bonk', e('br_bears', 0.1), -4), ('tiny_tuk', e('br_bears', 0.3), -4), ('tiny_tuk', e('br_bears', 0.5), -4),
        ('apple_crunch', e('br_ate'), -2), ('poof_cloth', e('br_plant'), -4), ('teleport_pop', e('br_plant', 0.3), -6),
        # IV в. до н. э.: Золотой человек
        ('coin_ring', S0['saka'] - 0.2, -4), ('tectonic_split', e('sk_open', -0.1), -8), ('shimmer', e('sk_open', 0.3), -3), ('coins_pouch', e('sk_4000'), 0), ('shimmer', e('sk_4000', 0.5), -4), ('tiny_tuk', e('sk_modest'), -6),
        # XIII в.: караван
        ('wind_gust', S0['silk'] - 0.3, 0), ('camel_grunt', S0['silk'] + 0.4, -6), ('scroll_unroll', e('sl_silk'), -2), ('coins_pouch', e('sl_seeds'), -8), ('stamp_thud', e('sl_contra'), 2),
        # 1865: Верное, апорт
        ('cloth_rip', S0['aport'] - 0.15, -6), ('poof_cloth', S0['aport'] + 0.05, -6), ('teleport_pop', e('ap_guest'), -2), ('shimmer', e('ap_guest', 0.25), -6), ('pencil_scribble', e('ap_name'), -6),
        # 1911: собор и землетрясение
        ('tectonic_split', S0['cathedral'] - 0.2, -4), ('scroll_unroll', e('ct_54'), -6), ('shimmer', e('ct_54', 0.5), -6), ('earthquake_rumble', e('ct_quake', -0.05), 0), ('stamp_thud', e('ct_10'), 0), ('ship_bell', e('ct_10', 0.6), -10),
        # 1929: Вавилов
        ('ship_bell', S0['vavilov'] - 0.2, -6), ('paper_whoosh', e('vv_saw'), -6), ('stamp_thud', e('vv_home'), 0), ('shimmer', e('vv_here'), -4),
        # 1943: ЦОКС
        ('rewind', S0['kino'] - 0.3, -8), ('typewriter', e('kn_kremlin', 0.1), -10), ('table_crash', e('kn_bush'), -6), ('wood_bonk', e('kn_none'), -2),
        # 1966/1973: Медеу
        ('wood_bonk', S0['blast'] - 0.05, 2), ('explosion_big', e('bl_boom', -0.05), 0), ('boulder_roll', e('bl_boom', 0.4), -6), ('mudflow_roar', e('bl_sel', -0.15), 0), ('stamp_thud', e('bl_4'), -2),
        # 2011: метро
        ('dive_splash', S0['metro'] - 0.3, -8), ('rivets_steel', S0['metro'] - 0.05, -8), ('typewriter', e('mt_dig'), -10), ('stamp_thud', e('mt_23'), -2), ('tiny_tuk', e('mt_7'), -2), ('tiny_tuk', e('mt_7', 0.07), -3), ('tiny_tuk', e('mt_7', 0.14), -3), ('crowd_cheer', e('mt_7', 0.4), -8),
        # три имени
        ('train_rush', S0['names'] - 0.3, -8), ('brush_whitewash', e('nm_aa'), -4), ('brush_whitewash', e('nm_a'), -4), ('coin_ring', e('nm_old'), 0), ('shimmer', e('nm_coin'), -4),
        # сегодня
        ('brush_whitewash', S0['today'] - 0.2, -4), ('shimmer', e('td_gran'), -4), ('teleport_pop', e('td_gran', 0.15), -6),
        # кнопка
        ('apple_crunch', S0['button'] - 0.2, 0), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    beds = [('bazaar_loop', 0, S0['tunnel'] + 0.2), ('forest_loop', S0['bears'], S1['bears']), ('wind_gust', S0['saka'], S1['saka']), ('bazaar_loop', S0['silk'], S1['silk']),
            ('forest_loop', S0['aport'], S1['aport']), ('wind_gust', S0['cathedral'], S1['cathedral']), ('forest_loop', S0['vavilov'], S1['vavilov']), ('campfire_loop', S0['kino'], S1['kino']),
            ('wind_gust', S0['blast'], S1['blast']), ('metro_loop', S0['metro'], S1['metro']), ('city_loop', S0['names'], S1['names']), ('forest_loop', S0['today'], S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_almaty')
