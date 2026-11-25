"""Звук выпуска 034 — Литва: подпись — канклес (первый звук глобуса, главы, «ПОДПИШИСЬ»), янтарь — стеклянный звон; музыка — music_litva.
Тяжёлые эпохи (раздел, запрет печати, 1940) — музыка приглушена, без весёлых звуков. Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: канклес, глобус, наезд, «крошечная», карта растёт до моря, кулон
        ('kankles_sting', 0.0, -4), ('time_zoom', e('hk_zoom'), -6), ('whip_whoosh', e('hk_zoom', 0.5), -8), ('wind_gust', e('hk_land', -0.1), -8),
        ('tiny_tuk', e('hk_tiny'), -4), ('paper_whoosh', e('hk_tiny', -0.1), -8), ('molten_pour', e('hk_grow'), -12), ('stamp_thud', e('hk_sea'), -4), ('glass_tap_ring', e('hk_go'), -6), ('rewind', e('hk_go', 0.3), -10),
        # отмотка: янтарь — свист оборота, засасывание, звон
        ('spin_whoosh', S0['tunnel'] + 0.05, -3), ('vortex_suck', S0['tunnel'] + 0.3, -6), ('glass_tap_ring', S1['tunnel'] - 0.3, -6), ('shimmer', S1['tunnel'] - 0.2, -6),
        # 1387: дуб, огонь, монахи с колокольчиком, плашка
        ('stamp_thud', S0['pagan'] + 0.3, -8), ('wind_gust', e('pg_oak'), -10), ('lantern_whoosh', e('pg_fire'), -4), ('church_bell_toll', e('pg_bapt', 0.2), -16), ('tiny_tuk', e('pg_last'), -4), ('kankles_sting', e('pg_last', 0.2), -12),
        # 1410: пыль, конница, рог, звон мечей, падение знамени
        ('dust_whoosh', S0['grunwald'] - 0.1, -6), ('horses_gallop', S0['grunwald'] + 0.2, -10), ('war_horn', e('gr_vit'), -8), ('sword_clash', e('gr_win'), -6), ('collapse_rumble', e('gr_win', 0.2), -12), ('crowd_cheer', e('gr_win', 0.5), -14), ('stamp_thud', e('gr_name'), -6),
        # XV в.: янтарная вспышка, глава, лебеди/вода, карта растёт, сравнение ×14
        ('shimmer', S0['empire'] - 0.1, -6), ('stamp_thud', S0['empire'] + 0.3, -8), ('teleport_pop', e('em_puff'), -6), ('paper_whoosh', e('em_map'), -6), ('molten_pour', e('em_grow'), -10), ('nav_ding', e('em_sea'), -8), ('metronome_tick', e('em_14'), -8), ('medal_fanfare', e('em_14', 0.6), -14),
        # 1569: разрез, сейм, ножницы
        ('scissors_snip', S0['lublin'] - 0.1, 0), ('crowd_cheer', e('lb_pl'), -16), ('scissors_snip', e('lb_cut'), 4), ('cloth_rip', e('lb_cut', 0.2), -8), ('paper_whoosh', e('lb_ua'), -8), ('stamp_thud', e('lb_ua', 0.3), -6),
        # 1795: шаги солдат, глава, «глоть», плашка
        ('marching_boots', S0['partition'] - 0.1, -8), ('stamp_thud', S0['partition'] + 0.3, -8), ('drum_march', e('pt_rest'), -12), ('paper_whoosh', e('pt_map'), -8), ('gulp_swallow', e('pt_eat', 0.2), -4), ('stamp_thud', e('pt_emp'), -6),
        # 1864–1904: листы, таймер, перечёркивание, прятки
        ('paper_whoosh', S0['books'] - 0.1, -4), ('clock_tick_heavy', e('bk_40'), -6), ('pencil_scribble', e('bk_lat'), -4), ('stamp_thud', e('bk_ban'), -8), ('cloth_rip', e('bk_smug'), -12), ('poof_cloth', e('bk_smug', 0.1), -8), ('dog_bark', e('bk_smug', 0.6), -16),
        # 1940: тяжёлый удар, серость, счётчик лет
        ('switch_clunk', S0['soviet'] - 0.05, -6), ('weight_slam', e('sv_ussr'), -6), ('neon_off', e('sv_ussr', 0.2), -10), ('metronome_tick', e('sv_half'), -8), ('tiny_tuk', e('sv_end'), -8),
        # 1989–90: цепь, глава, карта, флаг, «мы уходим»
        ('whip_whoosh', S0['chain'] - 0.1, -8), ('stamp_thud', S0['chain'] + 0.3, -8), ('pencil_scribble', e('ch_90'), -6), ('stamp_thud', e('ch_first'), -4), ('crowd_cheer', e('ch_go'), -6), ('kankles_sting', e('ch_go', 0.3), -10),
        # сегодня: ответ картой
        ('shimmer', S0['today'] - 0.1, -8), ('gavel_bang', e('answer'), -4), ('paper_whoosh', e('td_pl', -0.2), -8), ('stamp_thud', e('td_pl'), -6), ('stamp_thud', e('td_ru'), -4),
        # кнопка: телефон, «ПОДПИШИСЬ» на «Пиши» (канклес); после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('teleport_pop', e('bt_send'), -8), ('nav_ding', e('bt_send', 0.3), -8), ('teleport_pop', e('endcard'), -4), ('kankles_sting', e('endcard', 0.05), -8),
    ]
    beds = [('old_square_loop', 0, S0['tunnel']), ('campfire_loop', S0['pagan'], S1['pagan']), ('crickets_loop', S0['pagan'], S1['pagan']), ('steppe_wind_loop', S0['grunwald'], S1['grunwald']),
            ('gulls_river_loop', S0['empire'], S1['empire']), ('palace_court_loop', S0['lublin'], S1['lublin']), ('street_1770_loop', S0['partition'], S1['partition']), ('crickets_loop', S0['books'], S1['books']),
            ('occupation_night_loop', S0['soviet'], S1['soviet']), ('crowd_singing_loop', S0['chain'], S1['chain']), ('old_square_loop', S0['today'], S1['today']), ('old_square_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_litva', music_duck=[(S0['partition'], S1['soviet'], -6)])
