"""Звук выпуска 016 — Барселона: SFX и атмосферы от событий картинки (ev.json) и реплик."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: краны, счётчик, «долго?»
        ('rope_creak', 0.0, -8), ('stamp_thud', 0.05, -4), ('shimmer', e('hk_sag'), -8), ('stamp_thud', e('hk_144'), -4), ('metronome_tick', e('hk_144', 0.1), -10), ('tiny_tuk', e('hk_long'), -6),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # −10: мозаика, море, кирки
        ('chisel_strike', S0['barcino'] - 0.25, -8), ('chisel_strike', S0['barcino'] + 0.4, -10), ('stamp_thud', e('bc_name'), -6), ('coins_pouch', e('bc_vet'), -8),
        # 1298: витраж, колокол, долото
        ('shimmer', S0['seu'] - 0.3, -6), ('bell_crack', e('se_cat'), -8), ('chisel_strike', e('se_cat', 0.4), -10), ('teleport_pop', e('se_spire'), -8), ('stamp_thud', e('se_600'), -6),
        # 1714: ядро, пушки, обвал, праздник
        ('cannon_boom', S0['siege'] - 0.2, -4), ('cannon_boom', e('sg_siege'), -8), ('cannon_boom', e('sg_siege', 0.6), -10), ('boulder_drop', e('sg_fall'), -4), ('fireworks', e('sg_fest'), -10), ('crowd_cheer', e('sg_fest', 0.2), -10),
        # 1882: чертёж, канаты, камень
        ('scroll_unroll', S0['sagrada'] - 0.3, -4), ('rope_creak', e('sa_lay'), -8), ('stamp_thud', e('sa_lay', 0.8), -6), ('pencil_scribble', e('sa_g'), -8), ('goblet_clink', e('sa_q'), -10),
        # 1926: трамвай — звонок и тишина
        ('train_rush', S0['tram'] - 0.25, -8), ('ship_bell', e('tr_tram', -0.4), -6), ('train_rush', e('tr_tram', -0.2), -10), ('stamp_thud', e('tr_15'), -8),
        # 1936–1938: огонь, сирена, гул
        ('dust_whoosh', S0['civilwar'] - 0.3, -6), ('fire_flare', e('cw_plans'), -6), ('table_crash', e('cw_plans', 0.4), -10), ('siren_curfew', e('cw_bomb', -0.2), -10), ('heli_sputter', e('cw_bomb'), -14), ('tectonic_split', e('cw_bomb', 0.6), -14),
        # 2026: монеты, склейка, башня
        ('shimmer', S0['today'] - 0.3, -6), ('coins_pouch', e('td_money'), -4), ('coins_pouch', e('td_money', 0.4), -8), ('brick_trowel', e('td_glue', -0.4), -10), ('medal_fanfare', e('td_top'), -6), ('kremlin_chimes', e('td_world'), -14),
        # кнопка: крест-вспышка, портал, возврат к башням (петля)
        ('shimmer', S0['button'] - 0.3, -6), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('time_zoom', DUR - 0.9, -8),
    ]
    beds = [('city_loop', 0, S0['tunnel']), ('gulls_river_loop', S0['barcino'], S1['barcino']), ('masons_loop', S0['seu'], S1['seu']), ('city_fire_loop', S0['siege'], S1['siege']),
            ('crickets_loop', S0['sagrada'], S1['sagrada']), ('city_loop', S0['tram'], S1['tram']), ('city_fire_loop', S0['civilwar'], S1['civilwar']), ('city_loop', S0['today'], S1['today']),
            ('city_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_bcn', music_duck=[(S0['civilwar'] - 0.1, S1['civilwar'], -14)])
