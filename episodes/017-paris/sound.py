"""Звук выпуска 017 — Париж: SFX и атмосферы от событий картинки (ev.json) и реплик."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: бирка «на снос», вопросы
        ('ship_bell', 0.0, -12), ('stamp_thud', 0.05, -4), ('stamp_thud', e('hk_down'), -2), ('paper_whoosh', e('hk_down', -0.1), -8), ('tiny_tuk', e('hk_save'), -6), ('tiny_tuk', e('hk_save', 0.12), -8),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # −52: брызги, марш легиона
        ('dive_splash', S0['lutetia'] - 0.2, -6), ('drum_march', e('lu_rom'), -10), ('stamp_thud', e('lu_lut'), -6), ('shimmer', e('lu_par'), -8),
        # 1786: факел, телеги, подземелье
        ('fire_flare', S0['catacombs'] - 0.3, -8), ('rope_creak', S0['catacombs'] + 0.2, -8), ('stamp_thud', e('ca_mil'), -6), ('cave_drip_loop', e('ca_down'), -8),
        # 1789: ядро, толпа, тишина
        ('cannon_boom', S0['bastille'] - 0.2, -4), ('crowd_cheer', S0['bastille'] + 0.2, -10), ('boulder_drop', e('ba_st'), -4), ('crowd_cheer', e('ba_st', 0.2), -8), ('tiny_tuk', e('ba_7'), -4),
        # 1850-е: снос, стройка, открытка
        ('boulder_roll', S0['haussmann'] - 0.2, -6), ('table_crash', e('ha_dem'), -6), ('brick_trowel', e('ha_dem', 0.6), -10), ('stamp_thud', e('ha_card'), -6),
        # 1889: клёпка, фанфары, протест
        ('rivets_steel', S0['expo'] - 0.2, -8), ('rivets_steel', e('ex_tow'), -10), ('stamp_thud', e('ex_20'), -6), ('crowd_cheer', e('ex_art'), -12),
        # 1909–1914: морзянка, бирка улетает, перехват
        ('radio_tune', S0['radio'] - 0.3, -6), ('metronome_tick', e('ra_radio'), -8), ('arc_buzz', e('ra_ant'), -10), ('paper_whoosh', e('ra_70'), -6), ('medal_fanfare', e('ra_70', 0.2), -10), ('typewriter', e('ra_int'), -10),
        # 1940: ставни, моторы
        ('wood_bonk', S0['occupation'] - 0.2, -4), ('wood_bonk', e('oc_fight'), -6), ('heli_sputter', S0['occupation'] + 0.3, -16), ('freeze_crackle', e('oc_occ'), -14),
        # кнопка: портал, возврат к верхушке (петля)
        ('shimmer', S0['button'] - 0.3, -6), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('time_zoom', DUR - 0.9, -8),
    ]
    beds = [('city_loop', 0, S0['tunnel']), ('gulls_river_loop', S0['lutetia'], S1['lutetia']), ('cave_drip_loop', S0['catacombs'], S1['catacombs']), ('city_fire_loop', S0['bastille'], S1['bastille']),
            ('masons_loop', S0['haussmann'], S1['haussmann']), ('city_loop', S0['expo'], S1['expo']), ('crickets_loop', S0['radio'], S1['radio']), ('blizzard_loop', S0['occupation'], S1['occupation']),
            ('city_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_paris', music_duck=[(S0['occupation'] - 0.1, S1['occupation'], -14)])
