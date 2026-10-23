"""Звук выпуска 010 — Санкт-Петербург: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: призрак шведской крепости из тумана, таймлайн, медальон Петра
        ('wind_gust', 0.0, 0), ('tectonic_split', e('hk_swede', 0.05), -8), ('shimmer', e('hk_swede', 0.3), -6), ('stamp_thud', e('hk_400'), -4), ('teleport_pop', e('hk_peter'), -4),
        ('watch_click', e('hk_wind'), 0), ('clock_tick_heavy', e('hk_wind', 0.2), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1300: туман, Ландскрона строится, ладьи, пожар
        ('wind_gust', S0['landskrona'] - 0.2, -4), ('hammer_stakes', e('ld_build'), -8), ('ship_bell', e('ld_nov', -0.1), -8), ('drum_march', e('ld_nov', 0.2), -12), ('fire_flare', e('ld_burn'), 0),
        # 1703: пушечный выстрел-переход, крепость
        ('cannon_boom', S0['nyen'] - 0.25, -2), ('crowd_cheer', e('ny_take'), -10), ('hammer_stakes', e('ny_two'), -6), ('paper_whoosh', e('ny_two', 0.3), -8), ('stamp_thud', e('ny_fort'), -4),
        # 1714: колесо телеги, указ, камень в кучу
        ('wood_bonk', S0['stone'] - 0.25, -4), ('dust_whoosh', S0['stone'] - 0.05, -6), ('scroll_unroll', e('st_ban', -0.1), -4), ('stamp_thud', e('st_ban', 0.15), -4), ('shimmer', e('st_except'), -6), ('boulder_drop', e('st_tax', 0.1), -2),
        # 1719: банка-линза, рюмка
        ('bubbles_burst', S0['kunst'] - 0.25, -6), ('shimmer', S0['kunst'] - 0.05, -8), ('coins_pouch', e('ku_free'), -6), ('goblet_clink', e('ku_vodka', 0.1), 0), ('teleport_pop', e('ku_tsar'), -6),
        # 1824: вода заливает кадр, вал, рейка
        ('dive_splash', S0['flood'] - 0.3, -2), ('glacier_groan', e('fl_rise'), -8), ('dive_splash', e('fl_rise', 0.05), -6), ('tiny_tuk', e('fl_four'), -2), ('ship_bell', e('fl_dead', -0.05), -10),
        # 1832: гранитный ствол, канаты, бирка, «0 болтов»
        ('tectonic_split', S0['column'] - 0.3, -8), ('rope_creak', S0['column'] + 0.2, -2), ('rope_creak', S0['column'] + 1.2, -4), ('weight_slam', e('cl_600', -0.15), -2), ('rock_knock', e('cl_none', 0.25), 0), ('rock_knock', e('cl_none', 0.45), -6),
        # 1917: луч прожектора, холостой, хлопушка, бьются стёкла
        ('arc_buzz', S0['aurora'] - 0.3, -6), ('cannon_boom', e('au_shot'), -10), ('poof_cloth', e('au_shot', 0.2), -6), ('stamp_thud', e('au_blank'), -2), ('wood_bonk', e('au_film', -0.05), 0),
        ('crowd_cheer', e('au_film', 0.3), -10), ('ice_shatter', e('au_storm'), -4), ('city_fire_loop', e('au_storm', 0.1), -14),
        # 1941–1944: маятник метронома, календарь, карточка — сухо и тихо
        ('whip_whoosh', S0['blockade'] - 0.35, -8), ('metronome_tick', S0['blockade'] - 0.05, 4), ('paper_whoosh', e('bl_days'), -10), ('paper_whoosh', e('bl_bread', -0.05), -10),
        # сегодня: лёд трескается, коты, указ
        ('ice_shatter', S0['today'] - 0.3, -2), ('glacier_groan', S0['today'] - 0.2, -10), ('cat_meow', e('td_cats', 0.1), -4), ('scroll_unroll', e('td_1745', -0.05), -6), ('cat_meow', e('td_coll', 0.15), -2),
        # кнопка: разводится мост
        ('rope_creak', S0['button'] - 0.35, -4), ('ship_bell', S0['button'] - 0.05, -8), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    # метроном блокады: удар раз в секунду через всю сцену
    t = S0['blockade'] + 0.95
    while t < S1['blockade'] - 0.2:
        sfx.append(('metronome_tick', t, 0)); t += 1.0
    beds = [('gulls_river_loop', 0, S0['tunnel']), ('forest_loop', S0['landskrona'], e('ld_burn')), ('city_fire_loop', e('ld_burn'), S1['landskrona']),
            ('masons_loop', S0['nyen'], S1['nyen']), ('masons_loop', S0['stone'], S1['stone']), ('feast_loop', S0['kunst'], S1['kunst']),
            ('storm_rain_loop', S0['flood'], S1['flood']), ('city_loop', S0['column'], S1['column']), ('blizzard_loop', S0['aurora'], e('au_film')),
            ('projector_loop', e('au_film'), S1['aurora']), ('blizzard_loop', S0['blockade'], S1['blockade']), ('gulls_river_loop', S0['today'], S1['today']), ('night_city_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_piter', music_duck=[(S0['blockade'] - 0.1, S1['blockade'], -14)])
