"""Звук выпуска 004 — Берлин: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: Бранденбургские ворота уходят в топь
        ('swamp_squelch', 0.0, 2), ('dive_splash', 0.05, -6), ('bubbles_burst', 0.6, -8), ('frog_croak', e('bog_frog', 0.55), -4),
        ('swamp_squelch', e('bog_bear'), -2), ('bubbles_burst', e('bog_pun'), -4), ('shimmer', e('bog_pun', 0.1), -8),
        ('watch_click', e('bog_wind'), 0), ('clock_tick_heavy', e('bog_wind', 0.2), -4), ('bubbles_burst', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # −20 000: ледник и валун
        ('wind_gust', S0['ice'] - 0.1, 0), ('dust_whoosh', S0['ice'], -4), ('stamp_thud', e('ice_land'), -6), ('tiny_tuk', e('ice_scand'), -4),
        ('glacier_groan', e('ice_grind', -0.1), -1), ('boulder_roll', e('ice_grind'), -2), ('pencil_scribble', e('ice_mark', 0.1), -4),
        # 1237: двойняшки на Шпрее
        ('ice_shatter', S0['twins'] - 0.25, -8), ('heavy_water_loop', S0['twins'] - 0.1, -12), ('pencil_scribble', e('twins_moscow'), -6), ('stamp_thud', e('twins_90'), 0),
        ('teleport_pop', e('twins_twin', 0.05), -2), ('teleport_pop', e('twins_twin', 0.17), -2), ('crowd_cheer', e('twins_twin', 0.2), -12),
        # 1700: французский Берлин
        ('scroll_unroll', S0['huguenot'] - 0.3, -3), ('tiny_tuk', e('hug_count'), -4), ('tiny_tuk', e('hug_count', 0.12), -4), ('tiny_tuk', e('hug_count', 0.24), -4), ('tiny_tuk', e('hug_count', 0.36), -4), ('tiny_tuk', e('hug_count', 0.48), -1),
        ('shimmer', e('hug_fr'), -6), ('fire_flare', e('hug_cut'), -14), ('pencil_scribble', e('hug_bul'), -2),
        # 1806: квадрига в ящик
        ('poof_cloth', S0['quadriga'] - 0.15, 0), ('drum_march', S0['quadriga'] + 0.1, -10), ('horse_neigh', e('quad_lower', 0.1), -4), ('hammer_stakes', e('quad_lower', 0.6), -12),
        ('table_crash', e('quad_slam'), -2), ('stamp_thud', e('quad_slam', 0.15), 0), ('rewind', e('quad_web'), -10),
        # 1831: Гранитная чаша
        ('stamp_thud', S0['bowl'] - 0.15, -2), ('wood_bonk', S0['bowl'] + 0.1, -6), ('shimmer', e('bowl_shine'), -4), ('tiny_tuk', e('bowl_tape'), -4), ('boulder_drop', e('bowl_bump'), -2), ('stamp_thud', e('bowl_x'), -2),
        # 1862: двор Хобрехта
        ('dive_splash', S0['yard'] - 0.2, -8), ('fire_bell', e('yard_enter'), -4), ('horse_neigh', e('yard_cart', 0.3), -6), ('pencil_scribble', e('yard_dim'), -6), ('stamp_thud', e('yard_pot', 0.4), -4), ('ice_shatter', e('yard_pot', 0.42), -10),
        # 1948: воздушный мост
        ('dive_splash', S0['airlift'] - 0.25, -6), ('plane_flyover', e('air_plane', -1.2), 0), ('clock_tick_heavy', e('air_min'), -2), ('clock_tick_heavy', e('air_min', 0.5), -4), ('crowd_cheer', e('air_candy', 0.1), -8),
        # 1969: телебашня
        ('whip_whoosh', S0['tower'] - 0.2, -2), ('cloth_rip', e('tow_cut'), -6), ('glint_ding', e('tow_cross', -0.1), 4), ('shimmer', e('tow_cross'), -2),
        # 1989: Стена
        ('tv_static', S0['wall'] - 0.1, -6), ('chisel_strike', S0['wall'] + 0.4, -12), ('tv_static', e('wall_err'), -8), ('crowd_cheer', e('wall_now'), -2), ('fireworks', e('wall_now', 0.1), -4), ('wall_crack', e('wall_now', 0.05), -4),
        # сегодня: розовые трубы
        ('wall_crack', S0['today'] - 0.2, 0), ('water_gush', e('today_pipes'), -8), ('water_gush', e('today_gush'), -2), ('tiny_tuk', e('today_800'), -6), ('clock_tick_heavy', e('today_800', 0.9), -6),
        ('swamp_squelch', e('today_ghost'), -2), ('frog_croak', e('today_ghost', 0.35), -2),
        # кнопка
        ('vortex_suck', S0['button'] - 0.3, -2), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    beds = [('city_loop', 0, S0['tunnel'] + 0.2), ('blizzard_loop', S0['ice'], S1['ice']), ('forest_loop', S0['twins'], S1['twins']), ('moscow_loop', S0['huguenot'], S1['huguenot']),
            ('city_loop', S0['quadriga'], S1['quadriga']), ('forest_loop', S0['bowl'], S1['bowl']), ('masons_loop', S0['yard'], S1['yard']), ('city_loop', S0['airlift'], S1['airlift']),
            ('city_loop', S0['tower'], S1['tower']), ('campfire_loop', S0['wall'], S1['wall']), ('city_loop', S0['today'], S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_berlin')
