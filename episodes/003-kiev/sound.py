"""Звук выпуска 003 — Киев: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: эскалатор «Арсенальной», акула в толще берега
        ('escalator_rise', 0.0, -6), ('jaw_chomp', e('metro_shark', 0.05), 0), ('shark_swoosh', e('metro_shark', -0.3), -6), ('shimmer', e('metro_depth'), -5),
        ('watch_click', e('metro_wind'), 0), ('clock_tick_heavy', e('metro_wind', 0.2), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1909: вертолёт Сикорского
        ('dust_whoosh', S0['heli'] - 0.1, -1), ('poof_cloth', e('heli_land'), -6), ('heli_sputter', e('heli_spin'), -2), ('table_crash', e('heli_fail'), 0),
        ('teleport_pop', e('heli_us'), -4), ('shimmer', e('heli_am'), -6),
        # 1901: Дом с химерами
        ('wind_gust', S0['chimera'] - 0.2, -1), ('stamp_thud', e('chim_cliff'), -4), ('tiny_tuk', e('chim_top'), -2), ('tiny_tuk', e('chim_top', 0.22), -2), ('tiny_tuk', e('chim_top', 0.44), -2),
        ('whip_whoosh', e('chim_down'), -4), ('elephants', e('chim_six'), -4),
        # XII в.: пещеры Лавры
        ('vortex_suck', S0['caves'] - 0.28, -6), ('fire_flare', S0['caves'] + 0.05, -6), ('chisel_strike', e('cave_tally'), -10), ('pencil_scribble', e('cave_tally', 0.2), -8),
        ('scroll_unroll', e('cave_exp', -0.05), -3), ('stamp_thud', e('cave_true'), 2),
        # 1063: Анна во Франции
        ('ink_splat', S0['anna'] - 0.2, -2), ('stamp_thud', S0['anna'] - 0.05, -6), ('pencil_scribble', e('anna_king', 0.2), -6), ('pencil_scribble', e('anna_cross'), -6),
        ('pencil_scribble', e('anna_sign'), -2), ('shimmer', e('anna_gold'), -3),
        # 988: Перун
        ('ice_shatter', S0['perun'] - 0.2, -8), ('shimmer', e('per_gold'), -4), ('wood_bonk', e('per_beat'), 2), ('wood_bonk', e('per_beat', 0.22), 0), ('wood_bonk', e('per_beat', 0.44), 1), ('wood_bonk', e('per_beat', 0.62), 0),
        ('boulder_roll', e('per_fall'), -6), ('dive_splash', e('per_splash'), 0),
        # 882: Олег
        ('dive_splash', S0['oleg'] - 0.3, -6), ('bubbles_burst', S0['oleg'] - 0.1, -4), ('coins_pouch', e('oleg_merch'), -4), ('poof_cloth', e('oleg_reveal'), 0), ('crowd_cheer', e('oleg_reveal', 0.1), -8),
        # 482 / 1982
        ('cloth_rip', S0['kyi'] - 0.1, 0), ('typewriter', e('kyi_482', -0.1), -4), ('stamp_thud', e('kyi_stamp'), 2), ('fireworks', e('kyi_jub'), -2),
        # палеолит
        ('fire_flare', S0['mammoth'] - 0.1, -6), ('chisel_strike', e('mam_draw', 0.1), -8), ('chisel_strike', e('mam_draw', 0.35), -9), ('elephants', e('mam_pic', 0.1), -1),
        # эоценовое море
        ('dust_whoosh', S0['sea'] - 0.25, -2), ('dive_splash', S0['sea'] + 0.05, -4), ('shimmer', e('sea_sea'), -6), ('shark_swoosh', e('sea_kin'), -2), ('jaw_chomp', e('sea_bite', 0.25), 2),
        # сегодня
        ('jaw_chomp', S0['today'] - 0.05, -2), ('train_rush', S0['today'] + 0.1, -6), ('stamp_thud', e('td_105'), -6), ('shark_swoosh', e('td_shark'), -6), ('shimmer', e('td_shark', 0.6), -6),
        # кнопка
        ('rewind', S0['button'] - 0.25, 0), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    beds = [('metro_loop', 0, S0['tunnel'] + 0.2), ('forest_loop', S0['heli'], S1['heli']), ('city_loop', S0['chimera'], S1['chimera']), ('cave_drip_loop', S0['caves'], S1['caves']),
            ('feast_loop', S0['anna'], S1['anna']), ('wind_gust', S0['perun'], S1['perun']), ('heavy_water_loop', S0['oleg'], S1['oleg']), ('campfire_loop', S0['mammoth'], S1['mammoth']),
            ('underwater_loop', S0['sea'], S1['sea']), ('metro_loop', S0['today'], S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_kyiv')
