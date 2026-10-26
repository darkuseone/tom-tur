"""Звук выпуска 014 — Лос-Анджелес: SFX и атмосферы от событий картинки (ev.json) и реплик."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: надпись, кинолента, вопросы
        ('shimmer', 0.0, -8), ('stamp_thud', 0.05, -4), ('teleport_pop', e('hk_sign'), -6), ('projector_loop', e('hk_film', -0.1), -12), ('stamp_thud', e('hk_film', 0.2), -4), ('tiny_tuk', e('hk_what'), -6), ('tiny_tuk', e('hk_what', 0.12), -8),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # ледниковый: битум, мамонт, кошка
        ('bubbles_burst', S0['tarpits'] - 0.2, -4), ('dino_snort', e('tp_mam'), -6), ('cat_meow', e('tp_col', 0.1), -8), ('magma_bubble_loop', e('tp_sink'), -10),
        # 1781: солнце, колокол, повозка
        ('shimmer', S0['pueblo'] - 0.25, -6), ('bell_crack', S0['pueblo'] + 0.2, -12), ('rope_creak', e('pu_44'), -10), ('tiny_tuk', e('pu_44', 0.1), -6), ('stamp_thud', e('pu_ang'), -6),
        # 1892: фонтан нефти
        ('molten_pour', S0['oil'] - 0.3, -8), ('heavy_water_loop', e('oi_oil'), -8), ('crowd_cheer', e('oi_oil', 0.2), -12), ('hammer_stakes', e('oi_yard'), -10), ('stamp_thud', e('oi_q'), -6),
        # 1911: хлопушка, проектор, солнце
        ('wood_bonk', S0['studio'] - 0.15, -2), ('projector_loop', S0['studio'] + 0.1, -10), ('teleport_pop', e('st_st'), -6), ('neon_off', e('st_lamp'), -6), ('shimmer', e('st_sun'), -4),
        # 1913: вода, толпа, высыхание
        ('fish_swoosh', S0['aqueduct'] - 0.3, -6), ('heavy_water_loop', e('aq_w'), -6), ('crowd_cheer', e('aq_w', 0.3), -8), ('scroll_unroll', e('aq_km'), -6), ('freeze_crackle', e('aq_dry'), -10),
        # 1923 → 1949: буквы, лампы, падение LAND
        ('arc_buzz', S0['sign'] - 0.3, -10), ('hammer_stakes', S0['sign'] + 0.3, -8), ('hammer_stakes', e('sg_ad'), -8), ('arc_buzz', e('sg_name'), -8), ('stamp_thud', e('sg_18'), -6), ('table_crash', e('sg_land', 0.3), -4), ('boulder_roll', e('sg_land', 0.5), -8), ('medal_fanfare', e('sg_tmp'), -12),
        # 1942: сирена, зенитки, тишина
        ('siren_curfew', S0['battle'] - 0.2, -10), ('cannon_boom', e('bt_pvo'), -6), ('cannon_boom', e('bt_pvo', 0.5), -8), ('cannon_boom', e('bt_n'), -6), ('cannon_boom', e('bt_n', 0.4), -8), ('cannon_boom', e('bt_n', 0.8), -10), ('shimmer', e('bt_empty', 0.4), -8),
        # кнопка: луч заката, портал, возврат к надписи (петля)
        ('shimmer', S0['button'] - 0.3, -6), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('time_zoom', DUR - 0.9, -8),
    ]
    beds = [('city_loop', 0, S0['tunnel']), ('magma_bubble_loop', S0['tarpits'], S1['tarpits']), ('crickets_loop', S0['pueblo'], S1['pueblo']), ('forge_loop', S0['oil'], S1['oil']),
            ('crickets_loop', S0['studio'], S1['studio']), ('heavy_water_loop', S0['aqueduct'], S1['aqueduct']), ('city_loop', S0['sign'], S1['sign']), ('night_city_loop', S0['battle'], S1['battle']),
            ('city_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_la', music_duck=[(S0['battle'] + 0.2, S1['battle'] - 0.2, -6)])
