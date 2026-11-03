"""Звук выпуска 020 — Грозный: SFX и атмосферы от событий картинки (ev.json) и реплик. Семейство переходов — нефть, огонь, пар."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: удар с 0,0 с, призрак царя, красный росчерк, вопрос, часы
        ('stamp_thud', 0.0, -3), ('whip_whoosh', 0.02, -8), ('shimmer', e('hk_ivan', -0.05), -8), ('cloth_rip', e('hk_cross'), -4), ('pencil_scribble', e('hk_cross', 0.15), -8), ('teleport_pop', e('hk_who'), -6),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('ink_splat', S0['tunnel'] - 0.15, -4), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1818: пушечный дым-переход, план, салют пушки, доска «???»
        ('cannon_boom', S0['fort'] - 0.15, -4), ('dust_whoosh', S0['fort'] + 0.05, -8), ('scroll_unroll', e('ft_gen'), -6), ('cannon_boom', e('ft_fort', 0.05), -2), ('hammer_stakes', e('ft_fort', 0.5), -12), ('tiny_tuk', e('ft_name'), -6), ('horse_neigh', e('ft_end'), -12),
        # 1840: ветер сносит дым, залп в лесу, указатель, тетрадь
        ('wind_gust', S0['valerik'] - 0.2, -6), ('musket_volley', e('vl_war'), 0), ('drum_march', e('vl_war', 0.3), -14), ('wood_bonk', e('vl_river'), -8), ('horse_neigh', e('vl_river', 0.4), -14), ('paper_whoosh', e('vl_poet', -0.15), -6), ('pencil_scribble', e('vl_poet', 0.2), -10),
        # 1893: нефть поднимается, фонтан, ликование, пьедестал
        ('magma_bubble_loop', S0['oil'] - 0.2, -12), ('molten_pour', S0['oil'] - 0.1, -8), ('oil_gush', e('ol_gush'), 0), ('rock_knock', e('ol_gush', 0.05), -6), ('crowd_cheer', e('ol_oil'), -12), ('tiny_tuk', e('ol_second'), -6), ('medal_fanfare', e('ol_baku', -0.1), -12),
        # 1942: пламя снизу, сирена, карта, СТОП, бомбы, график
        ('fire_flare', S0['war42'] - 0.2, -2), ('siren_curfew', S0['war42'] + 0.1, -12), ('scroll_unroll', e('w4_hit'), -8), ('stamp_thud', e('w4_stop'), -4), ('cannon_boom', e('w4_bomb'), 0), ('collapse_rumble', e('w4_bomb', 0.3), -8), ('cannon_boom', e('w4_bomb', 0.7), -6), ('weight_slam', e('w4_100'), -6),
        # 1944: пар паровоза, гудок, счётчик, двери вагонов, карта, календарь
        ('radiator_hiss', S0['deport'] - 0.25, -4), ('steam_whistle', S0['deport'] + 0.1, -8), ('tiny_tuk', e('dp_num'), -6), ('gate_creak', e('dp_wag'), -2), ('stamp_thud', e('dp_wag', 0.5), -8), ('dog_bark', e('dp_wag', 0.8), -14), ('paper_whoosh', e('dp_kz'), -8), ('metronome_tick', e('dp_13'), -8),
        # 1994: ракета-вспышка, часы, штурм, обрушение
        ('fire_flare', S0['storm'] - 0.2, -6), ('shimmer', S0['storm'] + 0.05, -10), ('rock_knock', e('st_war'), -10), ('clock_tick_heavy', e('st_ny'), -4), ('cannon_boom', e('st_storm'), -2), ('musket_volley', e('st_storm', 0.3), -8), ('collapse_rumble', e('st_ruin'), 0), ('neon_off', e('st_ruin', 0.2), -10),
        # 2000: пыль оседает, дым, вырезка ООН, отъезд камеры
        ('dust_whoosh', S0['ruins'] - 0.2, -4), ('boulder_roll', e('rn_war'), -12), ('paper_whoosh', e('rn_un', -0.1), -6), ('stamp_thud', e('rn_un', 0.2), -6), ('wind_gust', e('rn_most'), -8), ('rock_knock', e('rn_earth'), -12),
        # сегодня: дождь смывает пыль, штампы годов, кран, взлёт к небоскрёбам
        ('storm_rain_loop', S0['today'] - 0.2, -10), ('shimmer', S0['today'] + 0.1, -6), ('tiny_tuk', e('td_hist'), -6), ('tiny_tuk', e('td_hist', 0.2), -8), ('rope_creak', e('td_build'), -8), ('rivets_steel', e('td_build', 0.4), -12), ('whip_whoosh', e('td_sky'), -6),
        # ответ: LED-полоса, крепость поднимается, доска «Грозная», карточка она→он
        ('arc_buzz', S0['answer'] - 0.2, -8), ('teleport_pop', e('an_who'), -8), ('glacier_groan', e('answer', -0.1), -10), ('cannon_boom', e('answer', 0.3), -10), ('medal_fanfare', e('an_name'), -8), ('stamp_thud', e('an_she'), -4), ('cat_meow', e('an_she', 0.4), -12),
        # кнопка: кольцо из часов, портал, возврат к ракурсу хука (петля)
        ('portal_open', S0['button'] - 0.2, -6), ('portal_open', E['portal'], -8), ('whip_whoosh', e('bt_point'), -10), ('clock_tick_heavy', e('bt_wink'), -4), ('stamp_thud', DUR - 0.25, -6),
    ]
    beds = [('gulls_river_loop', 0, S0['tunnel']), ('forest_loop', S0['fort'], S1['fort']), ('forest_loop', S0['valerik'], S1['valerik']), ('oilfield_loop', S0['oil'], S1['oil']),
            ('city_fire_loop', S0['war42'], S1['war42']), ('blizzard_loop', S0['deport'], S1['deport']), ('city_fire_loop', S0['storm'], S1['storm']), ('wind_gust', S0['ruins'], S1['ruins']),
            ('city_loop', S0['today'], S1['today']), ('gulls_river_loop', S0['answer'], S1['answer']), ('gulls_river_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_grozny', music_duck=[(S0['war42'] - 0.1, S1['ruins'], -7)])
