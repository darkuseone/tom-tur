"""Звук выпуска 002 — Москва: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: Красная площадь под морем
        ('kremlin_chimes', 0.0, -2), ('dive_splash', 0.02, -8), ('fish_swoosh', e('sq_fish', -0.35), -3), ('bubbles_burst', e('sq_fish'), -6),
        ('shimmer', e('sq_point'), -6), ('dive_splash', e('sq_touch'), -9), ('watch_click', e('sq_watch'), 0), ('clock_tick_heavy', e('sq_watch', 0.2), -4),
        ('rewind', e('sq_glow'), -5), ('portal_open', S0['tunnel'] - 0.45, 0), ('time_zoom', S0['tunnel'] - 0.1, -3),
        # море
        ('dive_splash', e('sea_splash', -0.05), 2), ('bubbles_burst', e('sea_splash', 0.1), -2), ('bubbles_burst', e('sea_land', 0.6), -9),
        ('shark_swoosh', e('sea_shark'), 0), ('fish_swoosh', e('sea_sharkTop', -0.2), -2), ('rock_knock', e('sea_shell'), -8),
        ('rewind', e('sea_lapse'), -7), ('chisel_strike', e('sea_white'), -4), ('rock_knock', e('sea_knock'), -3), ('stamp_thud', e('sea_stamp'), 2), ('stamp_thud', e('sea_seal'), -5),
        # ледник
        ('freeze_crackle', S0['ice'] - 0.38, -1), ('shiver_brr', S0['ice'] + 0.1, -4), ('glacier_groan', e('ice_wall'), 0), ('boulder_roll', e('ice_drag'), 0),
        ('boulder_drop', e('ice_stop'), 2), ('shimmer', e('ice_window'), -4),
        # пир 1147
        ('ink_splat', S0['feast'] - 0.34, 0), ('pencil_scribble', S0['feast'] + 0.1, -6), ('pencil_scribble', e('feast_write'), -7), ('goblet_clink', e('feast_toast'), -1),
        ('whip_whoosh', e('feast_boar', -0.24), -6), ('table_crash', e('feast_boar'), 1), ('weight_slam', e('feast_boar'), -8), ('coins_pouch', e('feast_pile'), -8),
        # белокаменный Кремль
        ('chisel_strike', S0['white'] - 0.22, 0), ('dust_whoosh', S0['white'] - 0.18, -2), ('wind_gust', S0['white'] + 0.15, -6),
        ('chisel_strike', e('white_hit1'), -4), ('chisel_strike', e('white_hit2'), -5), ('chisel_strike', e('white_hit3'), -5), ('rock_knock', e('white_chip'), 0), ('shimmer', e('white_chip', 0.1), -4),
        # красный Кремль → побелка
        ('scroll_unroll', S0['red'] - 0.45, 0), ('rock_knock', e('red_slap'), -4), ('brick_trowel', e('red_brick'), -2), ('stamp_thud', e('red_tsar'), 0), ('poof_cloth', e('red_tsar', 0.05), -6),
        ('poof_cloth', e('red_poof'), 0), ('brush_whitewash', e('red_stroke', -0.05), 2),
        # Царь-колокол
        ('molten_pour', S0['bell'] - 0.35, 0), ('freeze_crackle', S0['bell'] + 0.25, -8), ('whip_whoosh', e('bell_ton', -0.28), -6), ('weight_slam', e('bell_ton'), 2),
        ('tiny_tuk', e('bell_tap'), 4), ('fire_flare', e('bell_beam'), -6), ('bell_crack', e('bell_crack', -0.04), 1), ('boulder_drop', e('bell_chunkLand'), -4),
        # 1812
        ('fire_burn_through', S0['fire'] - 0.42, 0), ('drum_march', S0['fire'] + 0.2, -8), ('shimmer', e('fire_key'), -4), ('rock_knock', e('fire_tap'), -8),
        ('wind_gust', e('fire_empty'), -4), ('fire_flare', e('fire_burst'), 2),
        # метро
        ('train_rush', S0['metro'] - 0.5, 1), ('shimmer', e('metro_may'), -6), ('medal_fanfare', e('metro_medal'), -1), ('coins_pouch', e('metro_gp', 0.12), -6), ('teleport_pop', e('metro_ny'), -2),
        # сегодня
        ('escalator_rise', S0['today'] - 0.45, 0), ('whip_whoosh', S0['today'] + 0.15, -4), ('pencil_scribble', e('td_count'), -10), ('watch_click', e('td_full'), -2),
        ('bubbles_burst', e('td_sea'), -6), ('shimmer', e('td_sea', 0.2), -5), ('shimmer', e('td_wink'), -6),
        # кнопка
        ('vortex_suck', S0['button'] - 0.3, 0), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    beds = [('moscow_loop', 0, S0['tunnel'] + 0.2), ('heavy_water_loop', 0, S0['tunnel']), ('underwater_loop', S0['sea'], S1['sea']), ('blizzard_loop', S0['ice'], e('ice_window') + 0.3),
            ('feast_loop', S0['feast'], S1['feast']), ('masons_loop', S0['white'], S1['white'] + 5.0), ('forge_loop', S0['bell'], S1['bell']),
            ('city_fire_loop', e('fire_empty'), S1['fire']), ('metro_loop', S0['metro'], S1['metro']), ('moscow_loop', S0['today'], S1['today']), ('underwater_loop', e('td_sea'), S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_moscow_long')
