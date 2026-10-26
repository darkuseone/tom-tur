"""Звук выпуска 011 — Одесса: SFX и атмосферы от событий картинки (ev.json) и реплик. SFX: (файл, время, дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: катакомбы, капель, счётчик, «?»
        ('rock_knock', 0.0, -2), ('cave_drip_loop', 0.05, -8), ('tiny_tuk', e('hk_km'), -4), ('shimmer', e('hk_km', 0.3), -8), ('fire_flare', e('hk_who'), -6), ('stamp_thud', e('hk_who', 0.2), -6),
        ('watch_click', e('hk_wind'), 0), ('clock_tick_heavy', e('hk_wind', 0.2), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1789: волна, штурм
        ('dive_splash', S0['khadzhibey'] - 0.25, -2), ('paper_whoosh', e('kh_street'), -6), ('cannon_boom', e('kh_take', -0.1), -4), ('crowd_cheer', e('kh_take', 0.3), -10), ('cannon_boom', e('kh_take', 0.6), -10),
        # 1803: план, стройка
        ('scroll_unroll', S0['richelieu'] - 0.25, -2), ('hammer_stakes', S0['richelieu'] + 0.4, -10), ('chisel_strike', e('ri_duc'), -10), ('medal_fanfare', e('ri_pm', 0.1), -8),
        # порто-франко: шлагбаум, монеты
        ('whip_whoosh', S0['portofranco'] - 0.25, -4), ('wood_bonk', e('pf_duty', -0.05), -2), ('coins_pouch', e('pf_duty', 0.15), 0), ('ship_bell', e('pf_duty', 0.5), -10), ('medal_fanfare', e('pf_4'), -6),
        # лестница: складывание ступенями, обман зрения
        ('paper_whoosh', S0['stairs'] - 0.3, -4), ('tiny_tuk', S0['stairs'] - 0.15, -6), ('time_zoom', e('sr_bot', -0.1), -6), ('shimmer', e('sr_trick'), -4), ('teleport_pop', e('sr_trick', 0.1), -8),
        # Потёмкин / кино
        ('ship_bell', S0['potemkin'] - 0.3, -6), ('cannon_boom', e('po_was'), -14), ('wood_bonk', e('po_film', -0.05), 0), ('stamp_thud', e('po_eis'), -4),
        # 1941–1944: вспышка, оборона, оккупация, память — тихо
        ('fire_flare', S0['war'] - 0.25, -2), ('tectonic_split', S0['war'] - 0.1, -12), ('paper_whoosh', e('wa_73'), -10), ('freeze_crackle', e('wa_occ'), -12),
        # ответ: пила по камню, блок вверх
        ('stone_saw', S0['quarry'] - 0.3, -2), ('stone_saw', e('qu_ours'), -6), ('stone_saw', e('qu_ours', 1.2), -8), ('whip_whoosh', e('qu_built'), -6), ('boulder_drop', e('qu_built', 0.9), -6), ('stamp_thud', e('qu_feet'), -4),
        # сегодня
        ('fire_flare', S0['today'] - 0.25, -6), ('stamp_thud', e('td_un'), -6), ('cave_drip_loop', e('td_stands'), -10), ('crowd_cheer', e('td_stands', 0.5), -12),
        # кнопка: занавес, портал, провал в тоннель (петля)
        ('cloth_rip', S0['button'] - 0.3, -10), ('poof_cloth', S0['button'] - 0.05, -6), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('boulder_drop', DUR - 0.9, -8), ('rock_knock', DUR - 0.4, -6),
    ]
    beds = [('cave_drip_loop', 0, S0['tunnel']), ('gulls_river_loop', S0['khadzhibey'], S1['khadzhibey']), ('gulls_river_loop', S0['richelieu'], S1['richelieu']), ('city_loop', S0['portofranco'], S1['portofranco']),
            ('gulls_river_loop', S0['stairs'], S1['stairs']), ('city_loop', S0['potemkin'], e('po_film')), ('projector_loop', e('po_film'), S1['potemkin']), ('blizzard_loop', S0['war'], S1['war']),
            ('cave_drip_loop', S0['quarry'], S1['quarry']), ('gulls_river_loop', S0['today'], S1['today']), ('night_city_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_odessa', music_duck=[(S0['war'] - 0.1, S1['war'], -14)])
