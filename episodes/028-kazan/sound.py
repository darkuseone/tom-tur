"""Звук выпуска 028 — Казань: SFX и атмосферы от событий картинки (ev.json). Подпись выпуска — курай (первый звук хука и звук
«ПОДПИШИСЬ»), котёл кипит на отмотке; музыка — music_kazan (курай, гармонь, бубен). Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: курай, удар по табло, «+142», вопрос, половник
        ('kurai_sting', 0.0, -4), ('wood_bonk', e('hk_old', 0.05), -4), ('stamp_thud', e('hk_old', 0.1), -8), ('tiny_tuk', e('hk_142'), -4), ('metronome_tick', e('hk_142', 0.2), -10), ('tiny_tuk', e('hk_who'), -6),
        ('teleport_pop', E['h2'], -6), ('watch_click', E['h2'] + 0.05, -6), ('rewind', E['h2'] + 0.15, -8),
        # отмотка-казан: воронка, кипение, свист оборота, пар
        ('vortex_suck', S0['tunnel'] - 0.15, -8), ('cauldron_boil', S0['tunnel'], -2), ('spin_whoosh', S0['tunnel'] + 0.1, -3), ('radiator_hiss', S0['tunnel'] + 0.8, -4), ('whip_whoosh', S0['tunnel'] + 1.2, -6),
        # ≈1000: пар тает, глава, раскоп, крепость, мех, караван, ладья
        ('radiator_hiss', S0['bulgar'] - 0.05, -10), ('stamp_thud', S0['bulgar'] + 0.3, -8), ('shovel_dig', e('bg_dig'), -6), ('brush_dust', e('bg_dig', 0.3), -8), ('wood_bonk', e('bg_fort'), -10),
        ('poof_cloth', e('bg_fur'), -10), ('camel_grunt', e('bg_bagh'), -6), ('sail_flap', e('bg_scan'), -4), ('teleport_pop', e('bg_scan', 0.2), -8),
        # ханство: полог, нарды, счётчик лет, фишка, рог войны
        ('silk_swish', S0['khan'] - 0.1, -4), ('drum_march', e('kh_khans'), -12), ('tiny_tuk', e('kh_100'), -6), ('metronome_tick', e('kh_100', 0.2), -10), ('wood_bonk', e('kh_msk'), -6), ('tiny_tuk', e('kh_spor'), -8), ('war_horn', e('kh_war'), -2), ('table_crash', e('kh_war', 0.1), -8),
        # 1552: пороховой дым, глава, стяг, пушки, взрыв подкопа
        ('dust_whoosh', S0['siege'] - 0.1, -4), ('stamp_thud', S0['siege'] + 0.3, -8), ('drum_march', e('sg_ivan'), -10), ('cannon_boom', e('sg_took'), -10), ('shovel_dig', e('sg_walls'), -8), ('cannon_boom', e('sg_boom'), 0), ('collapse_rumble', e('sg_boom', 0.1), -4), ('boulder_drop', e('sg_boom', 0.4), -10),
        # 1561 Москва: колокол, табличка, «собор» — звон, лента
        ('church_bell_toll', S0['basil'] - 0.05, -6), ('tiny_tuk', e('bs_msk'), -6), ('medal_fanfare', e('bs_win'), -12), ('church_bell_toll', e('bs_sob'), -4), ('cloth_rip', e('bs_yes'), -10), ('shimmer', e('bs_kzn'), -6),
        # 1556 кремль: известь, кирки, табличка мастеров, кисть белит стену
        ('dust_whoosh', S0['kremlin'] - 0.1, -6), ('chisel_strike', e('kr_so', 0.2), -10), ('chisel_strike', e('kr_kr'), -10), ('stamp_thud', e('kr_psk'), -8), ('brush_whitewash', e('kr_white'), -2), ('shimmer', e('kr_white', 0.4), -12),
        # 1887 университет: страница, звонок, дверь, штамп «исключён», книги падают
        ('paper_whoosh', S0['univ'] - 0.1, -4), ('reception_bell', e('un_open'), -6), ('gate_creak', e('un_tol'), -10), ('tiny_tuk', e('un_len'), -8), ('safe_door_slam', e('un_out', -0.05), -4), ('stamp_thud', e('un_out', 0.05), -2), ('wood_bonk', e('un_out', 0.3), -8),
        # 2005: салют, ответ — фанфары, «1000», кисть в раскопе, спор историков
        ('fireworks', S0['mill'] - 0.1, -6), ('medal_fanfare', e('answer'), -6), ('crowd_cheer', e('answer', 0.1), -10), ('fireworks', e('ml_1000'), -8), ('brush_dust', e('ml_dig'), -6), ('teleport_pop', e('ml_spor'), -6), ('teleport_pop', e('ml_spor', 0.25), -8),
        # 2026: орнамент, подписи, «1 300 000»
        ('shimmer', S0['today'] - 0.1, -8), ('tiny_tuk', e('td_kr'), -10), ('teleport_pop', e('td_mosq'), -8), ('teleport_pop', e('td_sob'), -8), ('tiny_tuk', e('td_mil'), -4), ('metronome_tick', e('td_mil', 0.2), -10),
        # кнопка: «Казань?/Москва?», ПОДПИШИСЬ на «Пиши» (курай), подмигивание; после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('tiny_tuk', e('bt_kz'), -6), ('tiny_tuk', e('bt_ms'), -6), ('teleport_pop', e('endcard'), -4), ('kurai_sting', e('endcard', 0.05), -10), ('goblet_clink', e('bt_go'), -10),
    ]
    beds = [('gulls_river_loop', 0, S0['tunnel']), ('steppe_wind_loop', S0['bulgar'], S1['bulgar']), ('bazaar_loop', S0['bulgar'], S1['bulgar']), ('feast_loop', S0['khan'], S1['khan']), ('campfire_loop', S0['siege'], S1['siege']),
            ('old_square_loop', S0['basil'], S1['basil']), ('masons_loop', S0['kremlin'], S1['kremlin']), ('blizzard_loop', S0['univ'], S1['univ']), ('night_city_loop', S0['mill'], S1['mill']),
            ('night_city_loop', S0['today'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_kazan', music_duck=[(S0['siege'] - 0.1, S1['siege'], -6)])
