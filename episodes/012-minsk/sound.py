"""Звук выпуска 012 — Минск: SFX и атмосферы от событий картинки (ev.json) и реплик. SFX: (файл, время, дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: площадь, торты, ценники «НОВОЕ», «?»
        ('fireworks', 0.0, -12), ('stamp_thud', 0.05, -4), ('teleport_pop', e('hk_older'), -6), ('stamp_thud', e('hk_young'), -6), ('stamp_thud', e('hk_young', 0.15), -8), ('stamp_thud', e('hk_young', 0.3), -10), ('shimmer', e('hk_why'), -4),
        ('watch_click', e('hk_wind'), 0), ('clock_tick_heavy', e('hk_wind', 0.2), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1067: лёд, битва, летопись
        ('ice_shatter', S0['nemiga'] - 0.25, -2), ('sword_clash', S0['nemiga'] + 0.3, -6), ('sword_clash', S0['nemiga'] + 1.4, -10), ('scroll_unroll', e('ne_chron', -0.1), -4), ('stamp_thud', e('ne_mos'), -6),
        # 1499: печать, голосование, ратуша
        ('stamp_thud', S0['magdeburg'] - 0.1, 0), ('crowd_cheer', e('mg_vote'), -10), ('hammer_stakes', e('mg_vote', 0.4), -10), ('bell_crack', e('mg_hall', 0.2), -10),
        # 1857: лом, указ, снос
        ('rock_knock', S0['ratusha'] - 0.25, -2), ('scroll_unroll', e('ra_decree', -0.4), -6), ('stamp_thud', e('ra_decree'), -4), ('table_crash', e('ra_pris', 0.3), -6), ('boulder_roll', e('ra_pris', 0.5), -4),
        # 1898: лампа, счёт, манифест
        ('fire_flare', S0['congress'] - 0.2, -8), ('tiny_tuk', e('co_nine'), -6), ('tiny_tuk', e('co_nine', 0.3), -8), ('tiny_tuk', e('co_nine', 0.6), -8), ('pencil_scribble', e('co_party'), -6), ('stamp_thud', e('co_ussr'), -4),
        # 1941–1944: проволока, тишина
        ('whip_whoosh', S0['occupation'] - 0.3, -8), ('heli_sputter', S0['occupation'] + 0.2, -16), ('paper_whoosh', e('oc_day', -0.2), -10), ('freeze_crackle', e('oc_occ'), -12),
        # 1944–1955: пыль → кирпичи, стройка
        ('dust_whoosh', S0['ruins'] - 0.3, -4), ('brick_trowel', S0['ruins'] + 0.1, -8), ('hammer_stakes', e('ru_build'), -8), ('brick_trowel', e('ru_build', 0.6), -8), ('medal_fanfare', e('ru_empire'), -10),
        # 1961: радио, пропуск, Даллас
        ('radio_tune', S0['oswald'] - 0.3, -6), ('typewriter', S0['oswald'] + 0.4, -14), ('stamp_thud', e('os_name'), -6), ('paper_whoosh', e('os_dallas'), -6),
        # сегодня: радиоволна, призрак руин, ответ
        ('shimmer', S0['today'] - 0.25, -6), ('tectonic_split', e('td_erase'), -14), ('medal_fanfare', e('td_new'), -8),
        # кнопка: башенные часы, портал, наезд на ратушу (петля)
        ('clock_tick_heavy', S0['button'] - 0.3, -2), ('bell_crack', S0['button'] - 0.05, -12), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('time_zoom', DUR - 0.9, -8),
    ]
    beds = [('city_loop', 0, S0['tunnel']), ('blizzard_loop', S0['nemiga'], S1['nemiga']), ('feast_loop', S0['magdeburg'], S1['magdeburg']), ('city_loop', S0['ratusha'], S1['ratusha']),
            ('crickets_loop', S0['congress'], S1['congress']), ('blizzard_loop', S0['occupation'], S1['occupation']), ('masons_loop', S0['ruins'], S1['ruins']), ('metro_loop', S0['oswald'], S1['oswald']),
            ('city_loop', S0['today'], S1['today']), ('night_city_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_minsk', music_duck=[(S0['occupation'] - 0.1, S1['occupation'], -14)])
